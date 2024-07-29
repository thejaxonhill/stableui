import { auth } from "@/auth"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import CryptoJs from 'crypto-js';

const secret = process.env.NEXTAUTH_SECRET!

export default auth((req) => {
    const {auth, headers, nextUrl} = req;
    const {pathname, origin} = nextUrl;

    if (!auth && pathname !== "/login") {
        const newUrl = new URL("/login", origin)
        return Response.redirect(newUrl);
    }

    const requestHeaders = new Headers(headers);
    if(pathname.includes('api')) {
        const encryptedApiKey = cookies().get('external-id')?.value;
        const apiKey = encryptedApiKey
            ? CryptoJs.AES.decrypt(encryptedApiKey, secret).toString(CryptoJs.enc.Utf8)
            : '';
            
        requestHeaders.set('Authorization', `Bearer ${apiKey}`);
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
})

export const config = { 
    matcher: [
    "/api/control/:path*",
    "/api/edit/:path*",
    "/api/generate/:path*",
    "/api/upscale/:path*",
    "/generate/:path*", 
    "/upscale/:path*", 
    "/edit/:path*", 
    "/control/:path*"
] }