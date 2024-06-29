"use client"

import { useState } from 'react';
import { GenerateImageCoreParams, StylePreset, generateImageCore } from '../../ts/client/generate';
import GenerateImageForm from "./GenerateImageForm";
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { AspectRatio, OutputFormat } from '../../ts/types';

const GenerateImageCoreForm = () => {
    const [value, setValue] = useState<GenerateImageCoreParams>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"]
    });

    return (
        <GenerateImageForm value={value} onChange={r => setValue(r)} onSend={generateImageCore} >
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel >Style preset</InputLabel>
                    <Select
                        value={value?.stylePreset}
                        label="Style preset"
                        onChange={e => setValue({ ...value, stylePreset: e.target.value as StylePreset })}
                    >
                        <MenuItem value={undefined}>None</MenuItem>
                        {Object.keys(StylePreset).map((k, i) =>
                            <MenuItem key={k} value={Object.values(StylePreset)[i]}>{k}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Stack>

        </GenerateImageForm>
    )
}

export default GenerateImageCoreForm;