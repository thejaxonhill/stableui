"use client"

import { Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { searchAndReplace, SearchAndReplaceParams } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

export const validateSearchAndReplaceParams = (params: SearchAndReplaceParams) => params.image
    && params.prompt && validatePrompt(params.prompt)
    && params.searchPrompt && validatePrompt(params.searchPrompt)
    && (!params.negativePrompt || validatePrompt(params.negativePrompt))
    && (!params.seed || validateSeed(params.seed));

const SearchAndReplaceForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [params, setParams] = useState<SearchAndReplaceParams>({
        prompt: '',
        searchPrompt: '',
        growMask: 3,
        outputFormat: OutputFormat.PNG
    });

    const paramsValid = useMemo(() => validateSearchAndReplaceParams(params), [params]);

    const send = async () => {
        const image = await searchAndReplace(params);
        if (image instanceof File)
            setImage(image);
        else if (image)
            router.set('error', image);
    }

    return (
        <form action={send}>
            <Stack
                spacing={2}
                direction='column'
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 2 }}>
                <PromptField
                    required
                    label="Prompt"
                    value={params.prompt}
                    onChange={e => setParams({ ...params, prompt: e.target.value })} />
                <PromptField
                    required
                    label="Search prompt"
                    value={params.searchPrompt}
                    onChange={e => setParams({ ...params, searchPrompt: e.target.value })} />
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

export default SearchAndReplaceForm;