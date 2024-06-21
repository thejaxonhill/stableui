import { NextResponse } from "next/server";
import { GenerateImageParams } from "../../../../ts/client/generate-image";

export async function POST(request: Request) {
    const body: GenerateImageParams = await request.json();
    const formData = new FormData();
    formData.set("prompt", body.prompt);
    if(body.aspectRatio)
        formData.set("aspect_ratio", body.aspectRatio)
    if(body.negativePrompt)
        formData.set("negative_prompt", body.negativePrompt)
    if(body.outputFormat)
        formData.set("output_format", body.outputFormat.valueOf())
    if(body.seed)
        formData.set("seed", String(body.seed))
    return await fetch("https://api.stability.ai/v2beta/stable-image/generate/ultra", {
        body: formData,
        method: 'post',
        headers: {
            "Accept": "image/*",
            "Authorization": process.env.STABILITY_AI_API_KEY!
        }
    })
    .then(async res => {
        if(res.status >= 400)
            throw await res.text();
        return res.arrayBuffer()
    })
    .then(arrayBuffer => new NextResponse(arrayBuffer, {
        headers: {'content-type': 'image/*'}
    }))
    .catch(e => {
        console.log(e);
    })
}