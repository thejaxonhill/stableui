import { Box, Chip, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import GenerateImageCoreForm from "../../../components/generate/GenerateImageCoreForm";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

const GenerateCore = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Stack spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Image Core
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip label="3 credits" variant="outlined" />
                </Box>
            </Stack>
            <GenerateImageCoreForm />
        </Box>
    )
}

export default GenerateCore;