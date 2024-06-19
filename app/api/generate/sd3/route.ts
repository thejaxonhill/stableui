import { NextResponse } from "next/server";
import { arrayBuffer } from "stream/consumers";

export async function POST(request: Request) {
    console.log("In Gnenerate sd3");
    console.log(process.env.STABILITY_AI_API_KEY)
    const body = await request.json();
    const formData = new FormData();
    console.log(body)
    formData.set("prompt", body.prompt);
    return await fetch("https://api.stability.ai/v2beta/stable-image/generate/sd3", {
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