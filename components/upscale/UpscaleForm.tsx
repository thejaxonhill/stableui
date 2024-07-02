"use client"

import { Box, Button, Slider, Stack, Tooltip, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { UpscaleImageParams } from "../../ts/client/upscale";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, OutputFormatSelect, PromptField, SeedField, SubmitButton } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";
import { ApiKeyContext } from "../common/ApiKeyProvider";
import { useRouter } from "../../ts/nextjs/navigation";

type UpscaleFormProps = {
    onSend: (r: UpscaleImageParams, apiKey: string) => Promise<File | string>;
}

const UpscaleForm = ({ onSend }: UpscaleFormProps) => {
    const apiKey = useContext(ApiKeyContext);
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
        const image = await onSend(value, apiKey);
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
                <Button component='label' variant='contained' >
                    <input
                        key={value.image?.name}
                        type='file'
                        hidden
                        accept='image/*'
                        onChange={e => {
                            const { files } = e.target;
                            if (files && files.length > 0)
                                setValue({ ...value, image: files[0] })
                        }} />
                    Upload image *
                </Button>
                <Tooltip title={!value.image && 'Image required for creative upscale'} >
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
                    <Box>
                        <Typography variant='body2'>Creativity: {value.creativity ?? 0}</Typography>
                        <Slider
                            min={0.2}
                            max={0.5}
                            step={0.01}
                            value={value.creativity}
                            size='small'
                            onChange={(e, v) => setValue({ ...value, creativity: v as number })}
                            sx={{ minWidth: 100, maxWidth: 400 }} />
                    </Box>
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={value.prompt} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default UpscaleForm;