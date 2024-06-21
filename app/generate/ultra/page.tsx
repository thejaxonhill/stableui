import { Box, Chip, Typography } from "@mui/material";
import { Metadata } from "next";
import GenerateImageUltraForm from "../../../components/generate/GenerateImageUltraForm";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

const GenerateUltra = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Image Ultra
                </Typography>
                <Chip label="8 credits" variant="outlined" />
            </Box>
            <GenerateImageUltraForm />
        </Box>
    )
}

export default GenerateUltra;