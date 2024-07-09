import { Box } from "@mui/material"
import { Metadata } from "next"
import { TitleCard } from "../../../components/common"
import SearchAndReplaceForm from "../../../components/edit/SearchAndReplaceForm"

export const metadata: Metadata = {
    title: 'Stable UI - Search and Replace'
}

const SearchAndReplace = () => {
    return (
        <Box sx={{ mt: 3 }}>
            <TitleCard creditCost={4} title="Search and Replace" />
            <SearchAndReplaceForm />
        </Box>
    )
}

export default SearchAndReplace;