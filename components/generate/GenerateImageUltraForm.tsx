"use client"

import { useState } from 'react';
import { AspectRatio, GenerateImageCoreParams, OutputFormat, generateImageCore, generateImageUltra } from '../../ts/client/generate-image';
import GenerateImageForm from "./GenerateImageForm";

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