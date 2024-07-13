"use client"

import { useState } from 'react';
import { GenerateCoreParams, generateUltra } from '../../ts/client/generate';
import GenerateImageForm from "./GenerateImageForm";
import { AspectRatio, OutputFormat } from '../../ts/types';

const GenerateImageUltraForm = () => {
    const [value, setValue] = useState<GenerateCoreParams>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"]
    });

    return (
        <GenerateImageForm value={value} onChange={r => setValue(r)} onSend={generateUltra} />
    )
}

export default GenerateImageUltraForm;