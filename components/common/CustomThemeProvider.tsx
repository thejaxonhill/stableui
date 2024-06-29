"use client"

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#6366F1'
        }
    },
    typography: {
        fontFamily: 'inherit',
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#a6a7f7'
        }
    },
    typography: {
        fontFamily: 'inherit',
    }
});

export type CustomThemeProviderProps = {
    children: ReactNode;
}

interface CustomThemeContextProps {
    darkMode: boolean,
    setDarkMode: (value: any) => void
}

export const CustomThemeContext = createContext<CustomThemeContextProps>({
    darkMode: false,
    setDarkMode: (value: any) => {
    }
});

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
    const [darkMode, setDarkModeInternal] = useState(false);

    const setDarkMode = (value: any) => {
        setDarkModeInternal(value);
        localStorage.setItem('darkMode', value);
    }

    useEffect(() => {
        setDarkModeInternal(localStorage.hasOwnProperty('darkMode')
            ? localStorage.getItem('darkMode') === 'true'
            : false);
    }, []);

    return (
        <CustomThemeContext.Provider value={{ darkMode: darkMode, setDarkMode: setDarkMode }}>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    )
}

export default CustomThemeProvider;