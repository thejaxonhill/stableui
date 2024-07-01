import { Box } from "@mui/material";
import { Metadata } from "next";
import { TitleCard } from "../../../components/common";
import GenerateImageSD3Form from "../../../components/generate/GenerateImageSD3Form";
import { SD3Model } from "../../../ts/client/generate";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

type GenerateSD3Params = {
    searchParams: {
        model: string;
    }
}

const GenerateSD3 = async ({ searchParams }: GenerateSD3Params) => {
    const { model } = searchParams;

    const creditCost = (() => {
        switch (model) {
            case "sd3-large": return 6.5;
            case "sd3-large-turbo": return 4.5;
            default: return 3.5;
        }
    })();

    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={creditCost} title="Stable Diffusion 3" />
            <GenerateImageSD3Form model={model as SD3Model} />
        </Box>
    )
}

export default GenerateSD3;