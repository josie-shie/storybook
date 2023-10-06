import { createTheme } from '@mui/material/styles';

export const baseTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#2d2d2d'
        },
        error: {
            main: '#ED3A45'
        },
        warning: {
            main: '#FBB03B'
        },
        background: {
            default: '#1C1C1D'
        }
    }
});
