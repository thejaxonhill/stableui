import { OutputFormat } from "../types";
import { ExtendedFormData as FormData} from '../components/extended-formdata'
import { checkResponse, mapImageToImage } from "./shared";

export type ControlParams = {
    controlStrength?: number
    image?: File;
    negativePrompt?: string;
    outputFormat?: OutputFormat;
    prompt?: string;
    seed?: string;
}

export const sketch = async (params: ControlParams) => control("/api/control/sketch", params);

export const structure = async (params: ControlParams) => control("/api/control/structure", params);

const control = async (endpoint: string, {
    controlStrength,
    image,
    negativePrompt,
    outputFormat,
    prompt,
    seed
}: ControlParams) => {
    const formData = new FormData();
    formData.setIfPresent("control_strength", controlStrength ? String(controlStrength) : undefined);
    formData.setIfPresent("image", image);
    formData.setIfPresent("negative_prompt", negativePrompt);
    formData.setIfPresent("output_format", outputFormat?.valueOf());
    formData.setIfPresent("prompt", prompt);
    formData.setIfPresent("seed", seed);
    
    return await fetch(endpoint, {
        body: formData,
        method: 'post',
        headers: { "Accept": "image/*" }
    })
    .then(checkResponse)
    .then(mapImageToImage(image!, outputFormat));
}