"use client"

import { Alert, AlertColor, Box, Typography } from "@mui/material";
import { useRouter } from "../../ts/nextjs/navigation"

const GlobalAlertHandler = () => {
    const router = useRouter();
    const searchParams = router.searchParams;

    const mapAlert = (key: AlertColor) =>
        <Alert severity={key} sx={{ my: 1 }} onClose={() => router.remove(key)}>
            {searchParams.get(key)?.split(',').map(message => <Typography key={message}>{"- " + message}</Typography>)}
        </Alert>

    return (
        <Box>
            {searchParams.has("error") && mapAlert("error")}
            {searchParams.has("info") && mapAlert("info")}
            {searchParams.has("success") && mapAlert("success")}
            {searchParams.has("warning") && mapAlert("warning")}
        </Box >


    )
}

export default GlobalAlertHandler