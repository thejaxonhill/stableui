import ConstructionIcon from '@mui/icons-material/Construction';
import { Typography } from "@mui/material";

const UnderConstruction = () =>
    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
        <ConstructionIcon fontSize="large" sx={{ mr: 2 }} />
        Under Construction...
    </Typography>

export default UnderConstruction;