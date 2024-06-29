"use client"

import { useState } from 'react';
import { GenerateImageCoreParams, generateImageUltra } from '../../ts/client/generate';
import GenerateImageForm from "./GenerateImageForm";
import { AspectRatio, OutputFormat } from '../../ts/types';

const GenerateImageUltraForm = () => {
    const [value, setValue] = useState<GenerateImageCoreParams>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"]
    });

    return (
        <GenerateImageForm value={value} onChange={r => setValue(r)} onSend={generateImageUltra} />
    )
}

export default GenerateImageUltraForm;