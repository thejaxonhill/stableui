import { redirect } from "next/navigation";

const Home = async () => {
  redirect("/generate");
}

export default Home;