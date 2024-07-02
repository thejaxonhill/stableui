import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"
import EraseForm from "../../../components/edit/EraseForm"

export const metadata: Metadata = {
    title: 'Stable UI - Erase'
}

const Erase = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Erase" />
            <EraseForm />
            {/* <UnderConstruction /> */}
        </Box>
    )
}

export default Erase;