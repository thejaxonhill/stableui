import { OutputFormat } from "../types";
import {ExtendedFormData as FormData} from "../components/extended-formdata";

export type UpscaleImageParams = {
    prompt: string;
    image?: File;
    negativePrompt?: string;
    outputFormat?: OutputFormat;
    seed?: string;
    creativity?: number;
};

export const upscaleConservative = async (request: UpscaleImageParams) => { 
    return upscale("/api/upscale/conservative", request);
}

const upscale = async (endpoint: string, request: UpscaleImageParams) => {
    const formData = new FormData();
    formData.set("prompt", request.prompt);
    formData.setIfPresent("image", request.image);
    formData.setIfPresent("negative_prompt", request.negativePrompt);
    formData.setIfPresent("output_format", request.outputFormat?.valueOf());
    formData.setIfPresent("seed", request.seed ? String(request.seed): undefined);
    formData.setIfPresent("creativity", request.creativity ? String(request.creativity): undefined);
    return await fetch(endpoint, {
        body: formData,
        method: 'post',
        headers: { "Accept": "image/*" }
    })
    .then(res => res.ok ? res.blob() : res.json())
    .then(data => data instanceof Blob 
        ? new File([data], (formData.get('prompt')?.toString()??'image') + '.' + (formData.get('output_format')?.toString()??'png')) 
        : data.errors.reduce((e1: string, e2: string) => e1 + ';' + e2));
}