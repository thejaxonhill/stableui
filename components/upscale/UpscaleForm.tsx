"use client"

import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { UpscaleParams } from "../../ts/client/upscale";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

export const validateUpscaleParams = (params: UpscaleParams) => params.image
    && params.prompt
    && validatePrompt(params.prompt)
    && (!params.negativePrompt || validatePrompt(params.negativePrompt))
    && (!params.seed || validateSeed(params.seed));

type UpscaleFormProps = {
    onSend: (params: UpscaleParams) => Promise<File | string>;
}

const UpscaleForm = ({ onSend }: UpscaleFormProps) => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<UpscaleParams>({
        prompt: "",
        creativity: 0.35,
        outputFormat: OutputFormat.PNG
    });

    const paramsValid = useMemo(() => validateUpscaleParams(params), [params]);

    const handleUpscale = async () => {
        const image = await onSend(params);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.set('error', image);
    }

    return (
        <form action={handleUpscale}>
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
                        onChange={e => setParams({ ...params, prompt: e.target.value })} />
                </Box>
                <ImageInput
                    key={params.image?.name}
                    onChange={file => setParams({ ...params, image: file })}>
                    Upload image *
                </ImageInput>
                <Tooltip title={!params.image && 'Image required for upscale'} >
                    <span>
                        <SubmitButton
                            disabled={!paramsValid}
                            variant="contained"
                            sx={{ height: '100%', width: '100%' }}>
                            Send
                        </SubmitButton>
                    </span>
                </Tooltip>
            </Stack>
            {params.image &&
                <Box>
                    <Typography>Reference image: </Typography>
                    <ImageDisplay
                        alt={"Reference Image"}
                        image={params.image}
                        onClear={() => setParams({ ...params, image: undefined })}
                        maxWidth={400} />
                </Box>
            }
            <AdvancedOptions>
                <PromptField
                    onChange={e => setParams({ ...params, negativePrompt: e.target.value })}
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
                        onChange={outputFormat => setParams({ ...params, outputFormat: outputFormat as OutputFormat })} />
                    <SeedField
                        value={params.seed}
                        onChange={e => setParams({ ...params, seed: e.target.value })} />
                    <TitledSlider
                        min={0.2}
                        max={0.5}
                        step={0.01}
                        title={`Creativity: ${params.creativity ?? 0}`}
                        value={params.creativity}
                        onChange={(e, v) => setParams({ ...params, creativity: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={params.prompt} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default UpscaleForm;