"use client"

import { useState } from 'react';
import { GenerateCoreParams, StylePreset, generateCore } from '../../ts/client/generate';
import GenerateForm from "./GenerateForm";
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { AspectRatio, OutputFormat } from '../../ts/types';

const GenerateCoreForm = () => {
    const [value, setValue] = useState<GenerateCoreParams>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"]
    });

    return (
        <GenerateForm value={value} onChange={r => setValue(r)} onSend={generateCore} >
            <Stack
                spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 2 }}>
                <FormControl sx={{ minWidth: 170 }}>
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
        </GenerateForm>
    )
}

export default GenerateCoreForm;