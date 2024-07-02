"use client"

import { Box, Button, Slider, Stack, Tooltip, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { EraseParams, erase } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, OutputFormatSelect, SeedField, SubmitButton } from "../common";
import { ApiKeyContext } from "../common/ApiKeyProvider";
import { validateSeed } from "../common/SeedField";

const EraseForm = () => {
    const apiKey = useContext(ApiKeyContext);
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [value, setValue] = useState<EraseParams>({
        growMask: 5,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => value.image && (!value.seed || validateSeed(value.seed)), [value]);

    const send = async () => {
        const image = await erase(value, apiKey);
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
            <Stack
                spacing={{ xs: 0, sm: 2 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap>
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
                {value.mask &&
                    <Box>
                        <Typography>Mask image: </Typography>
                        <ImageDisplay
                            alt={"Mask Image"}
                            image={value.mask}
                            onClear={() => setValue({ ...value, mask: undefined })}
                            maxWidth={400} />
                        <Typography variant='body2'>Grow mask: {value.growMask ?? 0}</Typography>
                        <Slider
                            min={0}
                            max={20}
                            step={1}
                            value={value.growMask}
                            size='small'
                            onChange={(e, v) => setValue({ ...value, growMask: v as number })}
                            sx={{ minWidth: 100, maxWidth: 400 }} />
                    </Box>
                }
            </Stack>
            <AdvancedOptions>
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
                    <Button component='label' variant='contained' >
                        <input
                            key={value.mask?.name}
                            type='file'
                            hidden
                            accept='image/*'
                            onChange={e => {
                                const { files } = e.target;
                                if (files && files.length > 0)
                                    setValue({ ...value, mask: files[0] })
                            }} />
                        Upload mask
                    </Button>
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default EraseForm;