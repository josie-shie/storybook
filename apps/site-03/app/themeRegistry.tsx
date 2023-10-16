'use client';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baseTheme } from '@/styles/themes';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={baseTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
