import { Box, Chip, Typography } from "@mui/material";
import { Metadata } from "next";
import GenerateImageSD3Form from "../../../components/generate/GenerateImageSD3Form";
import { SD3Model } from "../../../ts/client/generate-image";

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
    let creditCost = "6.5";
    if (model)
        switch (model) {
            case "sd3-medium": creditCost = "3.5"
                break;
            case "sd3-large-turbo": creditCost = "4.5"
                break;
            case "sd3-large": creditCost = "6.5"
        }

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Diffusion 3
                </Typography>
                <Chip label={creditCost + " credits"} variant="outlined" />
            </Box>
            <GenerateImageSD3Form model={model} />
        </Box>
    )
}

export default GenerateSD3;