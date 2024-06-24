export { default } from "next-auth/middleware"

export const config = { matcher: ["/generate/:path*", "/upscale/:path*", "/edit/:path*", "/control/:path*"] }