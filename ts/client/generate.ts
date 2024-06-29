import { AspectRatio, OutputFormat } from "../types";
import { ExtendedFormData as FormData } from "../components/extended-formdata";

export type SD3Model = "sd3-large" | "sd3-large-turbo" |"sd3-medium";

export enum StylePreset {
    "3d Model" = "3d-model",
    "Analog film" = "analog-film",
    "Anime" = "anime",
    "Cinematic" = "cinematic",
    "Comic book" = "comic-book",
    "Digital art" = "digital-art",
    "Enhance" = "enhance",
    "Fantasy art" = "fantasy-art",
    "Isometric" = "isometric",
    "Line art" = "line-art",
    "Low poly" = "low-poly",
    "Modeling compound" = "modeling-compound",
    "Neon punk" = "neon-punk",
    "Origami" = "origami",
    "Photographic" = "photographic",
    "Pixel art" = "pixel-art",
    "Tile texture" = "tile-texture",
}

export type GenerateImageParams = {
    prompt: string;
    aspectRatio?: AspectRatio;
    negativePrompt?: string;
    outputFormat?: OutputFormat;
    seed?: number
};

export type GenerateImageCoreParams = GenerateImageParams & {
    stylePreset?: StylePreset;
};

export type GenerateImageSD3Params = GenerateImageParams & {
    image?: File;
    model?: SD3Model;
    strength?: number;
};

export type GenerateImageUltraParams = GenerateImageParams; 

export const generateImageCore = async (request: GenerateImageCoreParams, apiKey: string) => {
    const formData = formDatawithBaseParams(request);
    if(request.stylePreset)
        formData.set("style_preset", request.stylePreset)
    return await generateImage("/api/generate/core", formData, apiKey);
}

export const generateImageSD3 = async (request: GenerateImageSD3Params, apiKey: string) => {
    const formData = formDatawithBaseParams(request);
    formData.setIfPresent("model", request.model);
    if(request.image) {
        formData.set("image", request.image);
        formData.set("mode", "image-to-image");
        formData.set("strength", request.strength ? String(request.strength) : '0');
        formData.delete("aspect_ratio")
    }
    return await generateImage("/api/generate/sd3", formData, apiKey);
}

export const generateImageUltra = async (request: GenerateImageUltraParams, apiKey: string) => {
    return await generateImage("/api/generate/ultra", formDatawithBaseParams(request), apiKey);
}

const generateImage = async (endpoint: string, formData: FormData, apiKey: string) => {
    return await fetch(endpoint, {
        body: formData,
        method: 'post',
        headers: {
           "Accept": "image/*",
            "Authorization": apiKey
        }
    })
    .then(res => res.ok ? res.blob() : res.json())
    .then(data => data instanceof Blob 
        ? new File([data], (formData.get('prompt')?.toString()??'image') + '.' + (formData.get('output_format')?.toString()??'png')) 
        : data.errors.reduce((e1: string, e2: string) => e1 + ',' + e2))
}

const formDatawithBaseParams = <T extends GenerateImageParams> (request: T) => {
    const formData = new FormData();
    formData.setIfPresent("prompt", request.prompt);
    formData.setIfPresent("aspect_ratio", request.aspectRatio)
    formData.setIfPresent("negative_prompt", request.negativePrompt)
    formData.setIfPresent("output_format", request.outputFormat?.valueOf())
    formData.setIfPresent("seed", request.seed ? String(request): undefined)
    return formData;
}