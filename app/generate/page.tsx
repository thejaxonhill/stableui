import { Box, Typography } from "@mui/material";
import GenerateImageForm from "../../components/generate/GenerateImageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Stable UI - Generate Image'
}


const Generate = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h3" sx={{ mb: 3 }}>
                Image Generation
            </Typography>
            <GenerateImageForm />
        </Box>
    )
}

export default Generate;