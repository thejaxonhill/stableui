"use client"

import {Box, Switch, Tooltip} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import React, {ChangeEvent, useContext} from "react";
import {CustomThemeContext} from "./CustomThemeProvider";

const ThemeSwitch = () => {
    const {darkMode, setDarkMode} = useContext(CustomThemeContext);

    const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        setDarkMode(checked);
    };

    return (
        <Tooltip title='Dark mode'>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Switch checked={darkMode} onChange={onThemeChange}/>
                {darkMode ? <DarkModeIcon/> : <LightModeIcon/>}
            </Box>
        </Tooltip>
    )
}

export default ThemeSwitch;