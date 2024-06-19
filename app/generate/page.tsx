import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GenerateImageForm from "../../components/generate/GenerateImageForm";



const Generate = async () => {
    const session = await getServerSession();
    if (!session)
        redirect("/api/auth/signin?callback=/generate");

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