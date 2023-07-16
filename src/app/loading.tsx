'use client'

import { ThemeProvider } from "@emotion/react";
import { createTheme, CircularProgress } from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#8C71F4',
        },
    },
});

export default function Loading() {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <ThemeProvider theme={theme}>
                <CircularProgress thickness={5.0} size={100} />
            </ThemeProvider>
        </div>
    );
}