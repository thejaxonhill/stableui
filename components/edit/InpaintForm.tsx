"use client"

import { Box, Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { InpaintParams, inpaint } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

const InpaintForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [value, setValue] = useState<InpaintParams>({
        prompt: '',
        growMask: 5,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => value.image
        && value.prompt
        && validatePrompt(value.prompt)
        && (!value.negativePrompt || validatePrompt(value.negativePrompt))
        && (!value.seed || validateSeed(value.seed)), [value]);

    const send = async () => {
        const image = await inpaint(value);
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
                        value={value.prompt}
                        onChange={e => setValue({ ...value, prompt: e.target.value })} />
                </Box>
                <ImageInput
                    key={value.image?.name}
                    onChange={file => setValue({ ...value, image: file })}>
                    Upload image *
                </ImageInput>
                <Tooltip title={!value.image && 'Image required for inpaint'} >
                    <span>
                        <SubmitButton
                            disabled={!requestValid}
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
                    image={value.image}
                    onClear={() => setValue({ ...value, image: undefined })} />
                <TitledImageDisplay
                    alt={"Mask Image"}
                    title="Mask image:"
                    image={value.mask}
                    onClear={() => setValue({ ...value, mask: undefined })} />
            </Stack>
            <AdvancedOptions>
                <Stack
                    spacing={{ xs: 2, sm: 1 }}
                    direction={{ xs: 'column', sm: 'row' }}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }} >
                    <PromptField
                        onChange={e => setValue({ ...value, negativePrompt: e.target.value })}
                        fullWidth
                        label="Negative prompt"
                        value={value.negativePrompt}
                        sx={{ mb: 2 }} />
                    <OutputFormatSelect
                        value={value.outputFormat}
                        onChange={outputFormat => setValue({ ...value, outputFormat: outputFormat as OutputFormat })} />
                    <SeedField
                        value={value.seed}
                        onChange={e => setValue({ ...value, seed: e.target.value })} />
                    <ImageInput
                        key={value.mask?.name}
                        onChange={file => setValue({ ...value, mask: file })}>
                        Upload mask
                    </ImageInput>
                    <TitledSlider
                        min={0}
                        max={20}
                        step={1}
                        title={`Grow mask: ${value.growMask ?? 0}`}
                        value={value.growMask}
                        onChange={(e, v) => setValue({ ...value, growMask: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default InpaintForm;