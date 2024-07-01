import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Inpaint'
}

const Inpaint = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Inpaint" />
            <UnderConstruction />
        </Box>
    )
}

export default Inpaint;