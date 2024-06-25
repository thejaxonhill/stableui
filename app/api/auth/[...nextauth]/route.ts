import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        // FacebookProvider({
        //   clientId: process.env.META_CLIENT_ID!,
        //   clientSecret: process.env.META_CLIENT_SECRET!
        // }),
        DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID!,
          clientSecret: process.env.DISCORD_CLIENT_SECRET!
        }),
    ]
})

export { handler as GET, handler as POST };

