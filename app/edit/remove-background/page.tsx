import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Remove Background'
}

const RemoveBackground = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={2} title="Remove Background" />
            <UnderConstruction />
        </Box>
    )
}

export default RemoveBackground;