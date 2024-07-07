import { OutputFormat } from "../types";
import {ExtendedFormData as FormData} from "../components/extended-formdata";

export type EraseParams = {
    image?: File;
    mask?: File
    growMask?: number;
    outputFormat?: OutputFormat;
    seed?: string;
};

export const erase = async ({
    image,
    mask,
    growMask,
    outputFormat,
    seed,
}: EraseParams) => {
    const formData = new FormData();
    formData.setIfPresent("image", image);
    formData.setIfPresent("mask", mask);
    formData.setIfPresent("grow_mask", growMask ? String(growMask): undefined);
    formData.setIfPresent("output_format", outputFormat?.valueOf());
    formData.setIfPresent("seed", seed ? String(seed): undefined);
    
    return await fetch("/api/edit/erase", {
        body: formData,
        method: 'post',
        headers: { "Accept": "image/*" }
    })
    .then(res => res.ok ? res.blob() : res.json())
    .then(data => data instanceof Blob 
        ? new File([data], (image?.name.replace(/\.[^/.]+$/, "")) + '.' + outputFormat ?? 'png') 
        : data.errors.reduce((e1: string, e2: string) => e1 + ';' + e2));
}

export type InpaintParams = {
    prompt: string;
    image?: File;
    mask?: File
    growMask?: number;
    outputFormat?: OutputFormat;
    negativePrompt?: string;
    seed?: string;
};

export const inpaint = async ({
    prompt,
    image,
    mask,
    growMask,
    outputFormat,
    negativePrompt,
    seed,
}: InpaintParams) => {
    const formData = new FormData();
    formData.set("prompt", prompt)
    formData.setIfPresent("image", image);
    formData.setIfPresent("mask", mask);
    formData.setIfPresent("grow_mask", growMask ? String(growMask): undefined);
    formData.setIfPresent("negative_prompt", negativePrompt);
    formData.setIfPresent("output_format", outputFormat?.valueOf());
    formData.setIfPresent("seed", seed ? String(seed): undefined);
    
    return await fetch("/api/edit/erase", {
        body: formData,
        method: 'post',
        headers: { "Accept": "image/*" }
    })
    .then(res => res.ok ? res.blob() : res.json())
    .then(data => data instanceof Blob 
        ? new File([data], (image?.name.replace(/\.[^/.]+$/, "")) + '.' + outputFormat ?? 'png') 
        : data.errors.reduce((e1: string, e2: string) => e1 + ';' + e2));
}