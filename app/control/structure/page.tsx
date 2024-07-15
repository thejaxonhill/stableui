import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import { StructureForm } from "../../../components/control/ControlForm"

export const metadata: Metadata = {
    title: 'Stable UI - Structure'
}

const Structure = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Structure" />
            <StructureForm />
        </Box>
    )
}

export default Structure;