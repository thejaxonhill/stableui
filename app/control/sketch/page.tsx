import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Sketch'
}

const Sketch = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={3} title="Sketch" />
            <UnderConstruction />
        </Box>
    )
}

export default Sketch;