"use client"

import { Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { EraseParams, erase } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validateSeed } from "../common/SeedField";

export const validateEraseParams = (params: EraseParams) => params.image && (!params.seed || validateSeed(params.seed));

const EraseForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<EraseParams>({
        growMask: 5,
        outputFormat: OutputFormat.PNG
    });

    const paramsValid = useMemo(() => validateEraseParams(params), [params]);

    const send = async () => {
        const image = await erase(params);
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
                    key={params.image?.name}
                    onChange={file => setParams({ ...params, image: file })}>
                    Upload image *
                </ImageInput>
                <Tooltip title={!params.image && 'Image required for erase'} >
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
                spacing={{ xs: 0, sm: 3 }}
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

export default EraseForm;