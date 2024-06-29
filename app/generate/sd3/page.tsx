import { Box, Chip, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import GenerateImageSD3Form from "../../../components/generate/GenerateImageSD3Form";

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
            <Stack spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Diffusion 3
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip label={creditCost + " credits"} variant="outlined" />
                </Box>
            </Stack>
            <GenerateImageSD3Form model={model} />
        </Box>
    )
}

export default GenerateSD3;