"use client"

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, IconButton, Stack, TextField, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useContext, useMemo, useState } from 'react';
import { GenerateImageParams } from '../../ts/client/generate';
import { AspectRatio, OutputFormat } from '../../ts/types';
import { AspectRatioSelect, ImageDisplay, OutputFormatSelect, PromptField, SeedField, SubmitButton } from '../common';
import { ApiKeyContext } from "../common/ApiKeyProvider";
import { validatePrompt } from '../common/PromptField';
import { validateSeed } from '../common/SeedField';

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

    const handleGenerate = async () => {
        const image = await onSend(value, apiKey);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.replace(pathname + `?error=${image}`)
    }

    const requestValid = useMemo(() => value.prompt
        && validatePrompt(value.prompt)
        && (!value.negativePrompt || validatePrompt(value.negativePrompt))
        && (!value.seed || validateSeed(value.seed)), [value]);

    return (
        <form action={() => handleGenerate()}>
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <PromptField
                        required
                        label="Prompt"
                        value={value.prompt}
                        onChange={e => onChange({ ...value, prompt: e.target.value })} />
                </Box>
                {!value.image &&
                    <AspectRatioSelect
                        value={value.aspectRatio}
                        onChange={aspectRatio => onChange({ ...value, aspectRatio })} />
                }
                <SubmitButton
                    disabled={!requestValid}
                    variant="contained">
                    Send
                </SubmitButton>
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
                <PromptField
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
                    <OutputFormatSelect
                        value={value.outputFormat}
                        onChange={outputFormat => onChange({ ...value, outputFormat })} />
                    <SeedField
                        value={value.seed}
                        onChange={e => onChange({ ...value, seed: e.target.value })} />
                </Stack>
            </Collapse>
            <ImageDisplay alt={value.prompt} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default GenerateImageForm;