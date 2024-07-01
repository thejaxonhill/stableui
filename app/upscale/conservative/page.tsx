import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import UpscaleConservativeForm from "../../../components/upscale/UpscaleConservativeForm"

export const metadata: Metadata = {
    title: 'Stable UI - Conservative Upscale'
}

const ConservativeUpscale = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={25} title="Conservative Upscale" />
            <UpscaleConservativeForm />
        </Box>
    )
}

export default ConservativeUpscale;