import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home"
}

const Home = async () => {
  const session = await getServerSession();
  redirect(session ? "/generate" : "/api/auth/signin");
}

export default Home;