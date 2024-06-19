enum AspectRatio {
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

enum OutputFormat {
    JPEG = "jpeg",
    PNG ="png",
    WEBP ="webp",
}

enum SD3Model {
    Large = "sd3-large" ,
    LargeTurbo = "sd3-large-turbo",
    Medium = "sd3-medium"
}

enum StylePreset {
    ThreeDModel = "3d-model",
    AnalogFilm = "analog-film",
    Anime = "anime",
    Cinematic = "cinematic",
    ComicBook = "comic-book",
    DigitalArt = "digital-art",
    Enhance = "enhance",
    FantasyArt = "fantasy-art",
    Isometric = "isometric",
    LineArt = "line-art",
    LowPoly = "low-poly",
    ModelingCompound = "modeling-compound",
    NeonPunk = "neon-punk",
    Origami = "origami",
    Photographic = "photographic",
    PixelArt = "pixel-art",
    TileTexture = "tile-texture",
}

type GenerateImageParams = {
    prompt: string;
    aspectRatio?: AspectRatio;
    negativePrompt?: string;
    outputFormat?: OutputFormat;
    seed?: number
};

type GenerateImageCoreParams = GenerateImageParams & {
    stylePreset?: StylePreset;
};

type GenerateImageSD3Params = GenerateImageParams & {
    image?: File;
    model?: SD3Model;
    strength?: number;
};

type GenerateImageUltraParams = GenerateImageParams;

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