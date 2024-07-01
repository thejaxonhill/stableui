import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard, UnderConstruction } from "../../../components/common"

export const metadata: Metadata = {
    title: 'Stable UI - Search and Replace'
}

const SearchAndReplace = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={4} title="Search and Replace" />
            <UnderConstruction />
        </Box>
    )
}

export default SearchAndReplace;