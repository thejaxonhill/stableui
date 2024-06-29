import { Box, Chip, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import GenerateImageUltraForm from "../../../components/generate/GenerateImageUltraForm";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

const GenerateUltra = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <Stack spacing={{ xs: 2, sm: 1 }}
                direction={{ xs: 'column', sm: 'row' }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 3 }}>
                <Typography variant="h3" display='inline' sx={{ mr: 1 }}>
                    Stable Image Ultra
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip label="8 credits" variant="outlined" />
                </Box>
            </Stack>
            <GenerateImageUltraForm />
        </Box >
    )
}

export default GenerateUltra;