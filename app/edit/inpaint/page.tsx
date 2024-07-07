import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import InpaintForm from "../../../components/edit/InpaintForm"

export const metadata: Metadata = {
    title: 'Stable UI - Inpaint'
}

const Inpaint = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Inpaint" />
            <InpaintForm />
        </Box>
    )
}

export default Inpaint;