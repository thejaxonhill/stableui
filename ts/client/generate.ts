import { ExtendedFormData as FormData } from "../components/extended-formdata";
import { getFileExt } from "../components/file-helpers";
import { AspectRatio, OutputFormat } from "../types";
import { checkResponse, mapImageToImage, mapPromptToImage } from "./shared";

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

export type GenerateParams = {
    prompt: string;
    aspectRatio?: AspectRatio;
    negativePrompt?: string;
    outputFormat?: OutputFormat;
    seed?: string
};

export type GenerateCoreParams = GenerateParams & {
    stylePreset?: StylePreset;
};

export type GenerateSD3Params = GenerateParams & {
    image?: File;
    model?: SD3Model;
    strength?: number;
};

export type GenerateUltraParams = GenerateParams; 

export const generateCore = async (params: GenerateCoreParams) => {
    const formData = formDatawithBaseParams(params);
    if(params.stylePreset)
        formData.set("style_preset", params.stylePreset)
    return await generateImage("/api/generate/core", formData);
}

export const generateSD3 = async (params: GenerateSD3Params) => {
    const formData = formDatawithBaseParams(params);
    formData.setIfPresent("model", params.model);
    if(params.image) {
        formData.set("image", params.image);
        formData.set("mode", "image-to-image");
        formData.set("strength", params.strength ? String(params.strength) : '0');
        formData.delete("aspect_ratio")
    }
    return await generateImage("/api/generate/sd3", formData);
}

export const generateUltra = async (params: GenerateUltraParams) => {
    return await generateImage("/api/generate/ultra", formDatawithBaseParams(params));
}

const generateImage = async (endpoint: string, formData: FormData) => {
    const image = formData.get('image') as File;
    return await fetch(endpoint, {
        body: formData,
        method: 'post',
        headers: { "Accept": "image/*" }
    })
    .then(checkResponse)
    .then(image 
    ? mapImageToImage(image, getFileExt(image) as OutputFormat) 
    : mapPromptToImage(formData.get('prompt')?.toString()! , formData.get('output_format')?.toString() as OutputFormat))
}

const formDatawithBaseParams = <T extends GenerateParams> (params: T) => {
    const formData = new FormData();
    formData.set("prompt", params.prompt);
    formData.setIfPresent("aspect_ratio", params.aspectRatio)
    formData.setIfPresent("negative_prompt", params.negativePrompt)
    formData.setIfPresent("output_format", params.outputFormat?.valueOf())
    formData.setIfPresent("seed", params.seed)
    return formData;
}