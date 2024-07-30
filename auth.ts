import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
 
const prisma = new PrismaClient();
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
    verifyRequest: '/verify-request'
  },
  providers: [
    Resend({
        from: "no-reply@stableui.io",
        async sendVerificationRequest(params) {
            const { identifier: to, provider, url } = params
            const { host } = new URL(url)
            const res = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${provider.apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: provider.from,
                to,
                subject: `Sign in to ${host}`,
                html: html({ url, host }),
                text: text({ url, host }),
              }),
            })
 
            if (!res.ok)
              throw new Error("Resend error: " + JSON.stringify(await res.json()))
        },
      }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        allowDangerousEmailAccountLinking: true
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        allowDangerousEmailAccountLinking: true
      })
  ],
  callbacks: {
    authorized: async ({ auth }) => !!auth,
  },
})
 
function html(params: { url: string; host: string; }) {
  const { url, host } = params
 
  const escapedHost = host.replace(/\./g, "&#8203;.")
 
  const brandColor = "#6366F1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }
 
  return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            <img src="https://stableui.io/icon2.png" alt="Stable UI Logo" width="200" height="200"/>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 5px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Sign in to <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
                  <a href="${url}"
                     target="_blank"
                     style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                    Sign in
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
`
}
 
// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
const text = ({ url, host }: { url: string; host: string }) => {
  return `Sign in to ${host}\n${url}\n\n`
}