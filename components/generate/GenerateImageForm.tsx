"use client"

import { Box, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { ReactNode, useMemo, useState } from 'react';
import { AspectRatio, GenerateImageParams, OutputFormat } from '../../ts/client/generate-image';
import { ImageDisplay } from '../common';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type GenerateImageFormProps<T extends GenerateImageParams> = {
    children?: ReactNode;
    value: T;
    onChange: (params: GenerateImageParams) => void;
    onSend: (r: T) => Promise<File>;
}


const GenerateImageForm = ({
    children,
    value = {
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["16:9"]
    },
    onChange,
    onSend }: GenerateImageFormProps<any>) => {
    const [addtionalOptionsOpen, setAddtionalOptionsOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        const image = await onSend(value);
        if (image) setImage(image);
        setLoading(false);
    }

    const seedOkay = useMemo(() => !value.seed || typeof value.seed == 'number' && value.seed > 0 && value.seed < 4294967294, [value.seed]);

    return (
        <Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
                <TextField
                    onChange={e => onChange({ ...value, prompt: e.target.value })}
                    fullWidth
                    label="Prompt"
                    required
                    value={value.prompt} />
                <FormControl sx={{ mx: 1, minWidth: 100 }}>
                    <InputLabel >Aspect Ratio</InputLabel>
                    <Select
                        value={value.aspectRatio}
                        label="Aspect Ratio"
                        onChange={e => onChange({ ...value, aspectRatio: e.target.value as AspectRatio })}
                    >
                        {Object.values(AspectRatio).map(k =>
                            <MenuItem value={AspectRatio[k]}>{k}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <LoadingButton
                    disabled={!seedOkay}
                    onClick={handleGenerate}
                    loading={loading}
                    variant="contained" >
                    Send
                </LoadingButton>
            </Box>
            {children}
            <Box sx={{ display: 'flex', my: 1 }}>
                <Typography sx={{ my: 'auto', mr: 1 }}>
                    Advanced
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => setAddtionalOptionsOpen(!addtionalOptionsOpen)}>
                    {addtionalOptionsOpen && <ExpandLessIcon /> || <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={addtionalOptionsOpen} >
                <TextField
                    onChange={e => onChange({ ...value, negativePrompt: e.target.value })}
                    fullWidth
                    label="Negative prompt"
                    value={value.negativePrompt}
                    sx={{ mb: 2 }} />
                <FormControl sx={{ minWidth: 110, mr: 1 }}>
                    <InputLabel >Output format</InputLabel>
                    <Select
                        value={value.outputFormat}
                        label="Output format"
                        onChange={e => onChange({ ...value, outputFormat: e.target.value as OutputFormat })}
                    >
                        {Object.values(OutputFormat).map(k =>
                            <MenuItem value={k}>{k}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <TextField
                    onChange={e => onChange({ ...value, seed: e.target.value })}
                    label="Seed"
                    placeholder="0 .. 4294967294"
                    error={!seedOkay}
                    helperText={!seedOkay && "Seed must be between 0 - 4294967294"}
                    value={value.seed} />
            </Collapse>
            <ImageDisplay alt={value.prompt} image={image} />
        </Box>
    )
}

export default GenerateImageForm;