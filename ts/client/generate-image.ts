export enum AspectRatio {
    "1:1" = "1:1",
    "16:9" = "16:9",
    "21:9" = "21:9",
    "2:3" = "2:3",
    "3:2" = "3:2",
    "4:5" = "4:5",
    "5:4" = "5:4",
    "9:16" = "9:16",
    "9:21" = "9:21"
}

export enum OutputFormat {
    PNG ="png",
    JPEG = "jpeg",
    WEBP ="webp"
}

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
    if(request.model)
        formData.set("model", request.model);
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
    formData.set("prompt", request.prompt);
    if(request.aspectRatio)
        formData.set("aspect_ratio", request.aspectRatio)
    if(request.negativePrompt)
        formData.set("negative_prompt", request.negativePrompt)
    if(request.outputFormat)
        formData.set("output_format", request.outputFormat.valueOf())
    if(request.seed)
        formData.set("seed", String(request.seed))
    return formData;
}