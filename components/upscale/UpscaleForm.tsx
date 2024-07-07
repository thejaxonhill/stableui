"use client"

import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { UpscaleImageParams } from "../../ts/client/upscale";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

type UpscaleFormProps = {
    onSend: (r: UpscaleImageParams) => Promise<File | string>;
}

const UpscaleForm = ({ onSend }: UpscaleFormProps) => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [value, setValue] = useState<UpscaleImageParams>({
        prompt: "",
        creativity: 0.35,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => value.image
        && value.prompt
        && validatePrompt(value.prompt)
        && (!value.negativePrompt || validatePrompt(value.negativePrompt))
        && (!value.seed || validateSeed(value.seed)), [value]);

    const handleUpscale = async () => {
        const image = await onSend(value);
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
                        value={value.prompt}
                        onChange={e => setValue({ ...value, prompt: e.target.value })} />
                </Box>
                <ImageInput
                    key={value.image?.name}
                    onChange={file => setValue({ ...value, image: file })}>
                    Upload image *
                </ImageInput>
                <Tooltip title={!value.image && 'Image required for upscale'} >
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
            {value.image &&
                <Box>
                    <Typography>Reference image: </Typography>
                    <ImageDisplay
                        alt={"Reference Image"}
                        image={value.image}
                        onClear={() => setValue({ ...value, image: undefined })}
                        maxWidth={400} />
                </Box>
            }
            <AdvancedOptions>
                <PromptField
                    onChange={e => setValue({ ...value, negativePrompt: e.target.value })}
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
                        onChange={outputFormat => setValue({ ...value, outputFormat: outputFormat as OutputFormat })} />
                    <SeedField
                        value={value.seed}
                        onChange={e => setValue({ ...value, seed: e.target.value })} />
                    <TitledSlider
                        min={0.2}
                        max={0.5}
                        step={0.01}
                        title={`Creativity: ${value.creativity ?? 0}`}
                        value={value.creativity}
                        onChange={(e, v) => setValue({ ...value, creativity: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={value.prompt} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default UpscaleForm;