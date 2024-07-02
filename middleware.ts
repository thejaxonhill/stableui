import { withAuth } from "next-auth/middleware"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import CryptoJs from 'crypto-js';

const secret = process.env.NEXTAUTH_SECRET!

export default withAuth(function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const requestHeaders = new Headers(request.headers);

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