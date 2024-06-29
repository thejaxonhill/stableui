# [Stable UI](http://stableui.io)
Stable UI aims to provide a desktop and mobile friendly web UI for interacting with [Stability AI](https://stability.ai)'s v2beta REST api. It is designed for people seeking a free and easy to use solution for working with AI image technologies.

## Features
* [Generate](https://platform.stability.ai/docs/api-reference#tag/Generate)
    * [Stable Image Ultra](https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1ultra/post)
    * [Stable Image Core](https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1core/post)
    * [Stable Diffusion 3](https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1sd3/post)
* [Upscale](https://platform.stability.ai/docs/api-reference#tag/Upscale) (In Backlog)
    * [Conservative](https://platform.stability.ai/docs/api-reference#tag/Upscale/paths/~1v2beta~1stable-image~1upscale~1conservative/post)
    * [Creative](https://platform.stability.ai/docs/api-reference#tag/Upscale/paths/~1v2beta~1stable-image~1upscale~1creative/post)
* [Edit](https://platform.stability.ai/docs/api-reference#tag/Edit) (In Backlog)
    * [Erase](https://platform.stability.ai/docs/api-reference#tag/Edit/paths/~1v2beta~1stable-image~1edit~1erase/post)
    * [Inpaint](https://platform.stability.ai/docs/api-reference#tag/Edit/paths/~1v2beta~1stable-image~1edit~1inpaint/post)
    * [Outpaint](https://platform.stability.ai/docs/api-reference#tag/Edit/paths/~1v2beta~1stable-image~1edit~1outpaint/post)
    * [Search and Replace](https://platform.stability.ai/docs/api-reference#tag/Edit/paths/~1v2beta~1stable-image~1edit~1search-and-replace/post)
    * [Remove Background](https://platform.stability.ai/docs/api-reference#tag/Edit/paths/~1v2beta~1stable-image~1edit~1remove-background/post)
* [Control](https://platform.stability.ai/docs/api-reference#tag/Control) (In Backlog)
    * [Sketch](https://platform.stability.ai/docs/api-reference#tag/Control/paths/~1v2beta~1stable-image~1control~1sketch/post)
    * [Strcuture](https://platform.stability.ai/docs/api-reference#tag/Control/paths/~1v2beta~1stable-image~1control~1structure/post)

## Technologies
This project attempts to use minimal amount dependencies.<br>
Below are the primary libraries being used:
* [Next.js](https://nextjs.org/) - SSR, Routing, Fonts
* [NextAuth.js](https://next-auth.js.org/) - Authentication
* [Material UI](https://mui.com/) - Components, Theming

## Authentication
This project uses OAuth configured through [NextAuth.js](https://next-auth.js.org/). You will need to do one of two things before running server:
1. Set up an OAuth provider (Recommended)
2. Remove authentication code

### Set up an OAuth provider

Below is snippet of [app/auth/[...nextauth]/route.ts](https://github.com/thejaxonhill/stableui/blob/main/app/api/auth/%5B...nextauth%5D/route.ts), which has two providers. (This project currently uses Google or Discord and plans to add more). 

<pre>
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
</pre>

You can follow the instructions on [https://next-auth.js.org/](https://next-auth.js.org/) to set up providers of your choice. Once you have credentials for your chosen provider(s) using their services (e.g. [Google Cloud](https://console.cloud.google.com/apis/credentials), [Discord Deveolpers](https://discord.com/developers/applications)), create a .env.local file in the root of the project (this is ignored by git) and add the values required by your provider(s) as well as NEXTAUTH_SECRET with a secure value.<br>
Example .env.local file
<pre>
DISCORD_CLIENT_ID=******
DISCORD_CLIENT_SECRET=******
GOOGLE_CLIENT_ID=******
GOOGLE_CLIENT_SECRET=******
NEXTAUTH_SECRET=******
</pre>

***Do Not forget to configure your allowed redirect uris in your provider to allow, Discord's would be localhost:3000/api/auth/callback/discord***

### Remove Authentication
Start by deleting or changing the name of middleware.ts. Then change the file [app/auth/[...nextauth]/route.ts](https://github.com/thejaxonhill/stableui/blob/main/app/api/auth/%5B...nextauth%5D/route.ts) to the below code.
<pre>
import { NextRequest } from "next/server"
import { cookies } from "next/headers";
import CryptoJs from 'crypto-js';

const secret = process.env.MYSECRET!;
const thirtyDays = 30 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
    const apiKey = request.headers.get("Authorization");
    const cookiesStore = cookies();
    
    return await fetch(process.env.STABILITY_HOST! + '/v1/user/account', {
      headers: {'Authorization': apiKey??''}
    })
    .then(async res => {
      if(res.ok && apiKey) 
        cookiesStore.set({
          name: "external-id",
          value: CryptoJs.AES.encrypt(apiKey, secret).toString(),
          httpOnly: true,
          sameSite: 'lax',
          expires: Date.now() + thirtyDays
        });
        
        return res;
    })
}

export async function DELETE() {
  const cookiesStore = cookies();
  cookiesStore.delete("external-id");
  return new Response("Ok", {status: 200})
}
</pre>

Finally, remove the Provider component in the [app/layout.ts](https://github.com/thejaxonhill/stableui/blob/main/app/layout.tsx) file. 

## Getting Started

This project 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Roboto Mono, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

