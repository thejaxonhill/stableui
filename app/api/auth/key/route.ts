import { NextRequest } from "next/server"
import { cookies } from "next/headers";
import CryptoJs from 'crypto-js';

const secret = process.env.NEXTAUTH_SECRET!

export async function POST(request: NextRequest) {
    const cookiesStore = cookies();
    const apiKey = request.headers.get("Authorization");
    
    return await fetch(process.env.STABILITY_HOST! + '/v1/user/account', {
      headers: {'Authorization': apiKey??''}
    })
    .then(async res => {
      if(res.ok && apiKey) 
        cookiesStore.set({
          name: "apiKey",
          value: CryptoJs.AES.encrypt(apiKey, secret).toString(),
          httpOnly: true,
          sameSite: 'lax'
        });
        
        return res;
    })
}

export async function DELETE() {
  const cookiesStore = cookies();
  cookiesStore.delete("apiKey");
  return new Response("Ok", {status: 200})
}