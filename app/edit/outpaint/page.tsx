import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Outpaint'
}

const CreativeUpscale = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={4} title="Outpaint" />
            <UnderConstruction />
        </Box>
    )
}

export default CreativeUpscale;