import { NextRequest } from "next/server"
import { cookies } from "next/headers";
import CryptoJs from 'crypto-js';
import { getServerSession } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET!
const thirtyDays = 30 * 24 * 60 * 60 * 1000

export async function POST(request: NextRequest) {
    const apiKey = request.headers.get("Authorization");
    const cookiesStore = cookies();
    const session = await getServerSession();
    
    return await fetch(process.env.STABILITY_HOST! + '/v1/user/account', {
      headers: {'Authorization': apiKey??''}
    })
    .then(async res => {
      const user = await res.json()
      if(res.ok 
        && apiKey 
        && session 
        && (session.user?.email ? session.user.email === user.email : true)) 
        cookiesStore.set({
          name: "external-id",
          value: CryptoJs.AES.encrypt(apiKey, secret).toString(),
          httpOnly: true,
          sameSite: 'lax',
          expires: Date.now() + thirtyDays
        });
        
        return new Response(user, {status: res.status});
    })
}

export async function DELETE() {
  const cookiesStore = cookies();
  cookiesStore.delete("external-id");
  return new Response("Ok", {status: 200})
}