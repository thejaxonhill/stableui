import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Structure'
}

const Structure = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Structure" />
            <UnderConstruction />
        </Box>
    )
}

export default Structure;