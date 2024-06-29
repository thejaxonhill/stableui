import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID!,
          clientSecret: process.env.DISCORD_CLIENT_SECRET!
        }),
    ]
})

export { handler as GET, handler as POST };

