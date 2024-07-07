import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import OutpaintForm from "../../../components/edit/OutpaintForm"

export const metadata: Metadata = {
    title: 'Stable UI - Outpaint'
}

const CreativeUpscale = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={4} title="Outpaint" />
            <OutpaintForm />
        </Box>
    )
}

export default CreativeUpscale;