import { Box, Chip, Typography } from "@mui/material";
import { Metadata } from "next";
import GenerateImageCoreForm from "../../../components/generate/GenerateImageCoreForm";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

const GenerateCore = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Image Core
                </Typography>
                <Chip label="3 credits" variant="outlined" />
            </Box>
            <GenerateImageCoreForm />
        </Box>
    )
}

export default GenerateCore;