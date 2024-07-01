import { Box } from "@mui/material";
import { Metadata } from "next";
import { TitleCard } from "../../../components/common";
import GenerateImageUltraForm from "../../../components/generate/GenerateImageUltraForm";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

const GenerateUltra = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={8} title="Stable Image Ultra" />
            <GenerateImageUltraForm />
        </Box >
    )
}

export default GenerateUltra;