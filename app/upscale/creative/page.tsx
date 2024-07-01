import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Creative Upscale'
}

const CreativeUpscale = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={25} title="Creative Upscale" />
            <UnderConstruction />
        </Box>
    )
}

export default CreativeUpscale;