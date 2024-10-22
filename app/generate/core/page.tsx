import { Box } from "@mui/material";
import { Metadata } from "next";
import { TitleCard } from "../../../components/common";
import GenerateCoreForm from "../../../components/generate/GenerateCoreForm";

export const metadata: Metadata = {
    title: 'Stable UI - Generate - Stable Image Core'
}

const GenerateCore = async () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Stable Image Core" />
            <GenerateCoreForm />
        </Box>
    )
}

export default GenerateCore;