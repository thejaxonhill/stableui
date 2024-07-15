"use client"

import { Box, Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { ControlParams, sketch, structure } from "../../ts/client/control";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import PromptField, { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

export const validateControlParams = <T extends ControlParams>(params: T) => params.image
    && params.prompt
    && validatePrompt(params.prompt)
    && (!params.negativePrompt || validatePrompt(params.negativePrompt))
    && (!params.seed || validateSeed(params.seed));

export const SketchForm = () => <ControlForm send={sketch} />

export const StructureForm = () => <ControlForm send={structure} />

type ControlProps = {
    send: (params: ControlParams) => Promise<File | string>
}

const ControlForm = ({ send }: ControlProps) => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<ControlParams>({
        controlStrength: .7,
        outputFormat: OutputFormat.PNG,
        prompt: ''
    });

    const paramsValid = useMemo(() => validateControlParams(params), [params]);

    const handleControl = async () => {
        const image = await send(params);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.set('error', image);
    }

    return (
        <form action={() => handleControl()}>
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
                <Tooltip title={!params.image && 'Image required'} >
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
            <TitledImageDisplay
                alt={"Reference Image"}
                title="Reference image:"
                image={params.image}
                onClear={() => setParams({ ...params, image: undefined })} />
            <AdvancedOptions>
                <PromptField
                    label="Negative prompt"
                    value={params.negativePrompt}
                    onChange={e => setParams({ ...params, negativePrompt: e.target.value })}
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
                        min={0}
                        max={1}
                        step={.01}
                        title={`Control strength: ${params.controlStrength ?? 0}`}
                        value={params.controlStrength}
                        onChange={(e, v) => setParams({ ...params, controlStrength: v as number })} />
                </Stack>
            </AdvancedOptions>
            <ImageDisplay alt={image?.name ?? 'Response Image'} image={image} onClear={() => setImage(null)} showSave />
        </form>
    )
}

export default ControlForm;