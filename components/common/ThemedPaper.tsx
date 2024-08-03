"use client"

import { Paper, PaperProps, useTheme } from "@mui/material"

type ThemeColors = {
    color?: string;
    backgroundColor?: string;
}

type ThemedPaperProps = PaperProps & {
    light?: ThemeColors;
    dark?: ThemeColors;
}

const ThemedPaper = ({ light, dark, sx, ...props }: ThemedPaperProps) => {
    const theme = useTheme();
    const { mode, background, text } = theme.palette;
    console.log(mode)
    const color = mode === 'dark' ? dark?.color ?? text.primary : light?.color ?? text.primary;
    const backgroundColor = mode === 'dark' ? dark?.backgroundColor ?? background.paper : light?.backgroundColor ?? background.paper;
    return (
        <Paper {...props} sx={{
            color: color,
            backgroundColor: backgroundColor,
            ...sx
        }} />
    )
}

export default ThemedPaper;