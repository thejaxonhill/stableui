"use client"

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import { Box, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useContext, useMemo, useState } from 'react';
import { AspectRatio, GenerateImageParams, OutputFormat } from '../../ts/client/generate-image';
import { ImageDisplay } from '../common';
import { ApiKeyContext } from "../common/ApiKeyProvider";

type GenerateImageFormProps<T extends GenerateImageParams> = {
    children?: ReactNode;
    value: T;
    onChange: (params: GenerateImageParams) => void;
    onSend: (r: T, apiKey: string) => Promise<File | string>;
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
    const router = useRouter();
    const pathname = usePathname();
    const apiKey = useContext(ApiKeyContext);
    const [addtionalOptionsOpen, setAddtionalOptionsOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        console.log(apiKey)
        const image = await onSend(value, apiKey);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.replace(pathname + `?error=${image}`)
        setLoading(false);
    }

    const seedOkay = useMemo(() => !value.seed || Number(value.seed) > 0 && Number(value.seed) < 4294967294, [value.seed]);

    return (
        <Box>
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <TextField
                        onChange={e => onChange({ ...value, prompt: e.target.value })}
                        fullWidth
                        label="Prompt"
                        required
                        value={value.prompt}
                    />
                </Box>
                {!value.image &&
                    <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel >Aspect Ratio</InputLabel>
                        <Select
                            value={value.aspectRatio}
                            label="Aspect Ratio"
                            onChange={e => onChange({ ...value, aspectRatio: e.target.value as AspectRatio })}
                        >
                            {Object.values(AspectRatio).map(k =>
                                <MenuItem key={k} value={AspectRatio[k]}>{k}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                }
                <LoadingButton
                    disabled={!seedOkay}
                    onClick={handleGenerate}
                    loading={loading}
                    variant="contained">
                    Send
                </LoadingButton>
            </Stack>
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
                <Stack
                    spacing={{ xs: 2, sm: 1 }}
                    direction={{ xs: 'column', sm: 'row' }}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }} >
                    <FormControl >
                        <InputLabel >Output format</InputLabel>
                        <Select
                            value={value.outputFormat}
                            label="Output format"
                            onChange={e => onChange({ ...value, outputFormat: e.target.value as OutputFormat })}
                        >
                            {Object.values(OutputFormat).map(k =>
                                <MenuItem key={k} value={k}>{k}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        onChange={e => onChange({ ...value, seed: e.target.value })}
                        label="Seed"
                        placeholder="0 .. 4294967294"
                        error={!seedOkay}
                        helperText={!seedOkay && "Seed must be between 0 - 4294967294"}
                        value={value.seed}
                    />
                </Stack>
            </Collapse>
            <ImageDisplay alt={value.prompt} image={image} onClear={() => setImage(null)} showSave />
        </Box >
    )
}

export default GenerateImageForm;