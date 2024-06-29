"use client"

import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { GenerateImageSD3Params, SD3Model, generateImageSD3 } from '../../ts/client/generate';
import { useRouter } from '../../ts/nextjs/navigation';
import { ImageDisplay } from '../common';
import GenerateImageForm from "./GenerateImageForm";
import { AspectRatio, OutputFormat } from '../../ts/types';

type GenerateImageSD3FormProps = {
    model?: SD3Model;
}

const GenerateImageSD3Form = ({ model = 'sd3-medium' }: GenerateImageSD3FormProps) => {
    const router = useRouter();
    const [value, setValue] = useState<GenerateImageSD3Params>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"],
        model: model
    });

    return (
        <GenerateImageForm
            value={value}
            onChange={r => setValue(r)}
            onSend={generateImageSD3} >
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
                <Button component='label' variant='contained'>
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
                    Upload image
                </Button>
            </Stack>
            {value.image &&
                <Box>
                    <Typography variant='body2'>Strength: {value.strength ?? 0}</Typography>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={value.strength}
                        size='small'
                        onChange={(e, v) => setValue({ ...value, strength: v as number })}
                        sx={{ minWidth: 100, maxWidth: 400 }} />
                    <Typography>Reference image: </Typography>
                    <ImageDisplay
                        alt={"Reference Image"}
                        image={value.image}
                        onClear={() => setValue({ ...value, image: undefined })}
                        maxWidth={400} />
                </Box>
            }
        </GenerateImageForm>
    )
}

export default GenerateImageSD3Form;