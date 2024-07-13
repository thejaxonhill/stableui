"use client"

import { useState } from 'react';
import { GenerateCoreParams, generateUltra } from '../../ts/client/generate';
import GenerateForm from "./GenerateForm";
import { AspectRatio, OutputFormat } from '../../ts/types';

const GenerateUltraForm = () => {
    const [value, setValue] = useState<GenerateCoreParams>({
        prompt: "",
        outputFormat: OutputFormat.PNG,
        aspectRatio: AspectRatio["1:1"]
    });

    return (
        <GenerateForm value={value} onChange={r => setValue(r)} onSend={generateUltra} />
    )
}

export default GenerateUltraForm;