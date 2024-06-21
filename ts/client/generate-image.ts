export enum AspectRatio {
    "16:9" = "16:9",
    "1:1" = "1:1",
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

export enum SD3Model {
    Large = "sd3-large" ,
    LargeTurbo = "sd3-large-turbo",
    Medium = "sd3-medium"
}

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

export const generateImageCore = async (request: GenerateImageCoreParams) => {
    return await generateImage("/api/generate/core", request);
}

export const generateImageSD3 = async (request: GenerateImageSD3Params) => {
    return await generateImage("/api/generate/sd3", request);
}

export const generateImageUltra = async (request: GenerateImageUltraParams) => {
    return await generateImage("/api/generate/ultra", request);
}

const generateImage = async <T extends GenerateImageParams> (endpoint: string, request: T) => {
    return await fetch(endpoint, {
        body: JSON.stringify(request),
        method: 'post',
        headers: {
            "Accept": "image/*",
            "Content-Type": "application/json",
        }
    })
    .then(res => res.blob())
    .then(blob => new File([blob], "image.png"))
}