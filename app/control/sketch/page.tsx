import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import { SketchForm } from "../../../components/control/ControlForm"

export const metadata: Metadata = {
    title: 'Stable UI - Sketch'
}

const Sketch = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Sketch" />
            <SketchForm />
        </Box>
    )
}

export default Sketch;