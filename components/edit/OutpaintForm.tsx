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

const OutpaintForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [value, setValue] = useState<OutpaintParams>({
        prompt: '',
        creativity: .5,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => value.image
        && (!!value.left || value.right || value.up || value.down)
        && (!value.left || validateOutpaintDirection(value.left))
        && (!value.right || validateOutpaintDirection(value.right))
        && (!value.up || validateOutpaintDirection(value.up))
        && (!value.down || validateOutpaintDirection(value.down))
        && (!value.prompt || validatePrompt(value.prompt))
        && (!value.seed || validateSeed(value.seed)), [value]);

    const send = async () => {
        const image = await outpaint(value);
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
                <Tooltip title={!value.image && 'Image required for outpaint'
                    || !value.left && !value.right && !value.up && !value.down && 'At least one outpaint direction is required'} >
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
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 2 }}>
                <OutpaintDirection
                    direction="left"
                    value={value.left}
                    onChange={e => setValue({ ...value, left: e.target.value })}
                    sx={{ flexGrow: 1 }} />
                <OutpaintDirection
                    direction="right"
                    value={value.right}
                    onChange={e => setValue({ ...value, right: e.target.value })}
                    sx={{ flexGrow: 1 }} />
                <OutpaintDirection
                    direction="up"
                    value={value.up}
                    onChange={e => setValue({ ...value, up: e.target.value })}
                    sx={{ flexGrow: 1 }} />
                <OutpaintDirection
                    direction="down"
                    value={value.down}
                    onChange={e => setValue({ ...value, down: e.target.value })}
                    sx={{ flexGrow: 1 }} />
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
            </Stack>
            <AdvancedOptions>
                <Stack
                    spacing={{ xs: 2, sm: 1 }}
                    direction={{ xs: 'column', sm: 'row' }}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mb: 2 }} >
                    <PromptField
                        label="Prompt"
                        value={value.prompt}
                        onChange={e => setValue({ ...value, prompt: e.target.value })} />
                    <OutputFormatSelect
                        value={value.outputFormat}
                        onChange={outputFormat => setValue({ ...value, outputFormat: outputFormat as OutputFormat })} />
                    <SeedField
                        value={value.seed}
                        onChange={e => setValue({ ...value, seed: e.target.value })} />
                    <TitledSlider
                        min={0}
                        max={1}
                        step={.01}
                        title={`Creativity: ${value.creativity ?? 0}`}
                        value={value.creativity}
                        onChange={(e, v) => setValue({ ...value, creativity: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form >
    )
}

export default OutpaintForm;