"use client"

import { useState } from 'react';
import { AspectRatio, GenerateImageCoreParams, OutputFormat, StylePreset, generateImageCore } from '../../ts/client/generate-image';
import GenerateImageForm from "./GenerateImageForm";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const GenerateImageCoreForm = () => {
    const [value, setValue] = useState<GenerateImageCoreParams>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"]
    });

    return (
        <GenerateImageForm value={value} onChange={r => setValue(r)} onSend={generateImageCore} >
            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel >Style preset</InputLabel>
                <Select
                    value={value?.stylePreset}
                    label="Style preset"
                    onChange={e => setValue({ ...value, stylePreset: e.target.value as StylePreset })}
                >
                    <MenuItem value={undefined}>None</MenuItem>
                    {Object.keys(StylePreset).map((k, i) =>
                        <MenuItem value={Object.values(StylePreset)[i]}>{k}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </GenerateImageForm>
    )
}

export default GenerateImageCoreForm;