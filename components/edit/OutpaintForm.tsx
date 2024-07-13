"use client"

import { Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { OutpaintParams, outpaint } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";
import OutpaintDirection, { validateOutpaintDirection } from "./OutpaintDirection";

export const validateOutpaintParams = (params: OutpaintParams) => params.image
    && (!!params.left || params.right || params.up || params.down)
    && (!params.left || validateOutpaintDirection(params.left))
    && (!params.right || validateOutpaintDirection(params.right))
    && (!params.up || validateOutpaintDirection(params.up))
    && (!params.down || validateOutpaintDirection(params.down))
    && (!params.prompt || validatePrompt(params.prompt))
    && (!params.seed || validateSeed(params.seed));

const OutpaintForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<OutpaintParams>({
        prompt: '',
        creativity: .5,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => validateOutpaintParams(params), [params]);

    const send = async () => {
        const image = await outpaint(params);
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
                <OutpaintDirection
                    direction="left"
                    value={params.left}
                    onChange={e => setParams({ ...params, left: e.target.value })} />
                <OutpaintDirection
                    direction="right"
                    value={params.right}
                    onChange={e => setParams({ ...params, right: e.target.value })} />
                <OutpaintDirection
                    direction="up"
                    value={params.up}
                    onChange={e => setParams({ ...params, up: e.target.value })} />
                <OutpaintDirection
                    direction="down"
                    value={params.down}
                    onChange={e => setParams({ ...params, down: e.target.value })} />
            </Stack>
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
                <Tooltip title={!params.image && 'Image required for outpaint'
                    || !params.left && !params.right && !params.up && !params.down && 'At least one outpaint direction is required'} >
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
            <TitledImageDisplay
                alt={"Reference Image"}
                title="Reference image:"
                image={params.image}
                onClear={() => setParams({ ...params, image: undefined })} />
            <AdvancedOptions>
                <Stack
                    spacing={{ xs: 2, sm: 1 }}
                    direction={{ xs: 'column', sm: 'row' }}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }} >
                    <PromptField
                        label="Prompt"
                        value={params.prompt}
                        onChange={e => setParams({ ...params, prompt: e.target.value })} />
                    <OutputFormatSelect
                        value={params.outputFormat}
                        onChange={outputFormat => setParams({ ...params, outputFormat: outputFormat as OutputFormat })} />
                    <SeedField
                        value={params.seed}
                        onChange={e => setParams({ ...params, seed: e.target.value })} />
                    <TitledSlider
                        min={0}
                        max={1}
                        step={.01}
                        title={`Creativity: ${params.creativity ?? 0}`}
                        value={params.creativity}
                        onChange={(e, v) => setParams({ ...params, creativity: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default OutpaintForm;