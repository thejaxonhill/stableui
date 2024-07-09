"use client"

import { Stack, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { searchAndReplace, SearchAndReplaceParams } from "../../ts/client/edit";
import { useRouter } from "../../ts/nextjs/navigation";
import { OutputFormat } from "../../ts/types";
import { AdvancedOptions, ImageDisplay, ImageInput, OutputFormatSelect, PromptField, SeedField, SubmitButton, TitledImageDisplay, TitledSlider } from "../common";
import { validatePrompt } from "../common/PromptField";
import { validateSeed } from "../common/SeedField";

const SearchAndReplaceForm = () => {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [value, setValue] = useState<SearchAndReplaceParams>({
        prompt: '',
        searchPrompt: '',
        growMask: 3,
        outputFormat: OutputFormat.PNG
    });

    const requestValid = useMemo(() => value.image
        && value.prompt && validatePrompt(value.prompt)
        && value.searchPrompt && validatePrompt(value.searchPrompt)
        && (!value.negativePrompt || validatePrompt(value.negativePrompt))
        && (!value.seed || validateSeed(value.seed)), [value]);

    const send = async () => {
        const image = await searchAndReplace(value);
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
                    value={value.prompt}
                    onChange={e => setValue({ ...value, prompt: e.target.value })} />
                <PromptField
                    required
                    label="Search prompt"
                    value={value.searchPrompt}
                    onChange={e => setValue({ ...value, searchPrompt: e.target.value })} />
            </Stack>
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
            <TitledImageDisplay
                alt={"Reference Image"}
                title="Reference image:"
                image={value.image}
                onClear={() => setValue({ ...value, image: undefined })} />
            <AdvancedOptions>
                <PromptField
                    label="Negative prompt"
                    value={value.negativePrompt}
                    onChange={e => setValue({ ...value, negativePrompt: e.target.value })}
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

export default SearchAndReplaceForm;