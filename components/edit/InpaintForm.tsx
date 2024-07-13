"use client"

import { Box, Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { InpaintParams, inpaint } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

export const validateInpaintParams = (params: InpaintParams) => params.image
    && params.prompt
    && validatePrompt(params.prompt)
    && (!params.negativePrompt || validatePrompt(params.negativePrompt))
    && (!params.seed || validateSeed(params.seed))

const InpaintForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<InpaintParams>({
        prompt: '',
        growMask: 5,
        outputFormat: OutputFormat.PNG
    });

    const paramsValid = useMemo(() => validateInpaintParams(params), [params]);

    const send = async () => {
        const image = await inpaint(params);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.set('error', image);
    }

    return (
        <form action={send}>
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 2 }}>
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
                <Tooltip title={!params.image && 'Image required for inpaint'} >
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
            <Stack
                spacing={{ xs: 0, sm: 2 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap>
                <TitledImageDisplay
                    alt={"Reference Image"}
                    title="Reference image:"
                    image={params.image}
                    onClear={() => setParams({ ...params, image: undefined })} />
                <TitledImageDisplay
                    alt={"Mask Image"}
                    title="Mask image:"
                    image={params.mask}
                    onClear={() => setParams({ ...params, mask: undefined })} />
            </Stack>
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
                    <ImageInput
                        key={params.mask?.name}
                        onChange={file => setParams({ ...params, mask: file })}>
                        Upload mask
                    </ImageInput>
                    <TitledSlider
                        min={0}
                        max={20}
                        step={1}
                        title={`Grow mask: ${params.growMask ?? 0}`}
                        value={params.growMask}
                        onChange={(e, v) => setParams({ ...params, growMask: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default InpaintForm;