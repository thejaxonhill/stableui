"use client"

import { Box, Stack } from "@mui/material";
import { ReactNode, useMemo, useState } from 'react';
import { GenerateParams } from '../../ts/client/generate';
import { useRouter } from '../../ts/nextjs/navigation';
import { AspectRatio, OutputFormat } from '../../ts/types';
import { AdvancedOptions, AspectRatioSelect, ImageDisplay, OutputFormatSelect, PromptField, SeedField, SubmitButton } from '../common';
import { validatePrompt } from '../common/PromptField';
import { validateSeed } from '../common/SeedField';

export const validateGenerateParams = <T extends GenerateParams>(params: T) => params.prompt
    && validatePrompt(params.prompt)
    && (!params.negativePrompt || validatePrompt(params.negativePrompt))
    && (!params.seed || validateSeed(params.seed));

type GenerateImageFormProps<T extends GenerateParams> = {
    children?: ReactNode;
    value: T;
    onChange: (params: GenerateParams) => void;
    onSend: (params: T) => Promise<File | string>;
}

const GenerateForm = ({
    children,
    value: params = {
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["16:9"]
    },
    onChange,
    onSend }: GenerateImageFormProps<any>) => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);

    const handleGenerate = async () => {
        const image = await onSend(params);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.set('error', image)
    }

    const paramsValid = useMemo(() => validateGenerateParams(params), [params]);

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
                        value={params.prompt}
                        onChange={e => onChange({ ...params, prompt: e.target.value })} />
                </Box>
                {!params.image &&
                    <AspectRatioSelect
                        value={params.aspectRatio}
                        onChange={aspectRatio => onChange({ ...params, aspectRatio })} />
                }
                <SubmitButton
                    disabled={!paramsValid}
                    variant="contained">
                    Send
                </SubmitButton>
            </Stack>
            {children}
            <AdvancedOptions>
                <PromptField
                    onChange={e => onChange({ ...params, negativePrompt: e.target.value })}
                    fullWidth
                    label="Negative prompt"
                    value={params.negativePrompt}
                    sx={{ mb: 2 }} />
                <Stack
                    spacing={{ xs: 2, sm: 1 }}
                    direction={{ xs: 'column', sm: 'row' }}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }} >
                    <OutputFormatSelect
                        value={params.outputFormat}
                        onChange={outputFormat => onChange({ ...params, outputFormat })} />
                    <SeedField
                        value={params.seed}
                        onChange={e => onChange({ ...params, seed: e.target.value })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={params.prompt} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default GenerateForm;