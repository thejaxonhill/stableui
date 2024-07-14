import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import RemoveBackgroundForm from "../../../components/edit/RemoveBackgroundForm"

export const metadata: Metadata = {
    title: 'Stable UI - Remove Background'
}

const RemoveBackground = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={2} title="Remove Background" />
            <RemoveBackgroundForm />
        </Box>
    )
}

export default RemoveBackground;