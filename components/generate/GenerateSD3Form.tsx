"use client"

import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useState } from 'react';
import { GenerateSD3Params, SD3Model, generateSD3 } from '../../ts/client/generate';
import { useRouter } from '../../ts/nextjs/navigation';
import { AspectRatio, OutputFormat } from '../../ts/types';
import { ImageInput, TitledImageDisplay, TitledSlider } from '../common';
import GenerateImageForm from "./GenerateImageForm";

type GenerateImageSD3FormProps = {
    model?: SD3Model;
}

const GenerateImageSD3Form = ({ model = 'sd3-medium' }: GenerateImageSD3FormProps) => {
    const router = useRouter();
    const [value, setValue] = useState<GenerateSD3Params>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"],
        strength: .5,
        model: model
    });

    return (
        <GenerateImageForm
            value={value}
            onChange={r => setValue(r)}
            onSend={generateSD3} >
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ my: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Model</InputLabel>
                    <Select
                        value={value.model}
                        label="Model"
                        onChange={e => {
                            const { value } = e.target;
                            setValue(old => ({ ...old, model: value as SD3Model }));
                            router.set('model', e.target.value);
                        }}>
                        <MenuItem value={"sd3-medium"}>Medium</MenuItem>
                        <MenuItem value={"sd3-large-turbo"}>Large Turbo</MenuItem>
                        <MenuItem value={"sd3-large"}>Large</MenuItem>
                    </Select>
                </FormControl>
                <ImageInput
                    key={value.image?.name}
                    onChange={file => setValue({ ...value, image: file })}>
                    Upload image
                </ImageInput>
            </Stack>
            {value.image &&
                <Box>
                    <TitledImageDisplay
                        alt={"Reference Image"}
                        title="Reference image:"
                        image={value.image}
                        onClear={() => setValue({ ...value, image: undefined })} />
                    <TitledSlider
                        min={0}
                        max={1}
                        step={0.01}
                        title={`Strength: ${value.strength ?? 0}`}
                        value={value.strength}
                        onChange={(e, v) => setValue({ ...value, strength: v as number })} />
                </Box>
            }
        </GenerateImageForm>
    )
}

export default GenerateImageSD3Form;