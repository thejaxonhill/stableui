import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Stable UI - Generate Image'
}

const Generate = async () => {
    redirect("/generate/sd3");
}

export default Generate;