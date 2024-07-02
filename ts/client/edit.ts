import { OutputFormat } from "../types";
import {ExtendedFormData as FormData} from "../components/extended-formdata";

export type EraseParams = {
    image?: File;
    mask?: File
    growMask?: number;
    outputFormat?: OutputFormat;
    seed?: string;
};

export const erase = async (request: EraseParams, apiKey: string) => {
    const formData = new FormData();
    formData.setIfPresent("image", request.image);
    if(request.mask) {
        formData.set("mask", request.mask);
        formData.setIfPresent("grow_mask", request.growMask ? String(request.growMask): undefined);
    }
    formData.setIfPresent("output_format", request.outputFormat?.valueOf());
    formData.setIfPresent("seed", request.seed ? String(request.seed): undefined);
    
    return await fetch("/api/edit/erase", {
        body: formData,
        method: 'post',
        headers: {
           "Accept": "image/*",
            "Authorization": apiKey
        }
    })
    .then(res => res.ok ? res.blob() : res.json())
    .then(data => data instanceof Blob 
        ? new File([data], (request.image?.name.replace(/\.[^/.]+$/, "")) + '.' + request.outputFormat ?? 'png') 
        : data.errors.reduce((e1: string, e2: string) => e1 + ';' + e2));
}