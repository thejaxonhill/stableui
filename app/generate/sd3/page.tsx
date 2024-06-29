import { Box, Chip, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
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
            case "sd3-large": return "6.5"
            case "sd3-large-turbo": return "4.5"
            case "sd3-medium": return "3.5"
            default: return "3.5"
        }
    });

    return (
        <Box sx={{ mt: 3 }}>
            <Stack spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Diffusion 3
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip label={creditCost() + " credits"} variant="outlined" />
                </Box>
            </Stack>
            <GenerateImageSD3Form model={model as SD3Model} />
        </Box>
    )
}

export default GenerateSD3;