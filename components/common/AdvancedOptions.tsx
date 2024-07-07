"use client"

import { ReactNode, useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type AdvancedOptionsProps = {
    children?: ReactNode;
}

const AdvancedOptions = ({ children }: AdvancedOptionsProps) => {
    const [addtionalOptionsOpen, setAddtionalOptionsOpen] = useState(false);

    return (
        <>
            <Box sx={{ display: 'flex', my: 1 }}>
                <Typography sx={{ my: 'auto', mr: 1 }}>
                    Advanced
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => setAddtionalOptionsOpen(!addtionalOptionsOpen)}>
                    {addtionalOptionsOpen && <ExpandLessIcon /> || <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={addtionalOptionsOpen} >
                <Box sx={{ py: 1 }}>
                    {children}
                </Box>
            </Collapse>
        </>
    )
}

export default AdvancedOptions;