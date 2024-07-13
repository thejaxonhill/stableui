import { OutputFormat } from "../types";
import {ExtendedFormData as FormData} from "../components/extended-formdata";
import { checkResponse, mapImageToImage } from "./shared";

export type UpscaleParams = {
    prompt: string;
    image?: File;
    negativePrompt?: string;
    outputFormat?: OutputFormat;
    seed?: string;
    creativity?: number;
};

export const upscaleConservative = async (request: UpscaleParams) => { 
    return upscale("/api/upscale/conservative", request);
}

const upscale = async (endpoint: string, request: UpscaleParams) => {
    const formData = new FormData();
    formData.set("prompt", request.prompt);
    formData.setIfPresent("image", request.image);
    formData.setIfPresent("negative_prompt", request.negativePrompt);
    formData.setIfPresent("output_format", request.outputFormat?.valueOf());
    formData.setIfPresent("seed", request.seed);
    formData.setIfPresent("creativity", request.creativity ? String(request.creativity): undefined);
    return await fetch(endpoint, {
        body: formData,
        method: 'post',
        headers: { "Accept": "image/*" }
    })
    .then(checkResponse)
    .then(mapImageToImage(request.image!, request.outputFormat));
}