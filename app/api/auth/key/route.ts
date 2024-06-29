import { NextRequest } from "next/server"
import { cookies } from "next/headers";
import CryptoJs from 'crypto-js';
import { getServerSession } from "next-auth";

const secret = process.env.NEXTAUTH_SECRET!;
const thirtyDays = 30 * 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
    const apiKey = request.headers.get("Authorization");
    const cookiesStore = cookies();
    const session = await getServerSession();
    
    return await fetch(process.env.STABILITY_HOST! + '/v1/user/account', {
      headers: {'Authorization': apiKey??''}
    })
    .then(async res => {
      const user = await res.json();
      const emailsMatch = session && session.user?.email === user.email;
      if(res.ok 
        && apiKey 
        && emailsMatch) 
        cookiesStore.set({
          name: "external-id",
          value: CryptoJs.AES.encrypt(apiKey, secret).toString(),
          httpOnly: true,
          sameSite: 'lax',
          expires: Date.now() + thirtyDays
        });
        
        return emailsMatch 
        ? new Response(JSON.stringify(user), {status: res.status}) 
        : new Response(JSON.stringify({
          message: 'Email of current account does not match email of account associated with key.'
        }), {status: 400});
    })
}

export async function DELETE() {
  const cookiesStore = cookies();
  cookiesStore.delete("external-id");
  return new Response("Ok", {status: 200})
}