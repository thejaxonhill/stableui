"use client"

import { Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { EraseParams, erase } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validateSeed } from "../common/SeedField";

const EraseForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [value, setValue] = useState<EraseParams>({
        growMask: 5,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => value.image && (!value.seed || validateSeed(value.seed)), [value]);

    const send = async () => {
        const image = await erase(value);
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
                <ImageInput
                    key={value.image?.name}
                    onChange={file => setValue({ ...value, image: file })}>
                    Upload image *
                </ImageInput>
                <Tooltip title={!value.image && 'Image required for erase'} >
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
                spacing={{ xs: 0, sm: 3 }}
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

export default EraseForm;