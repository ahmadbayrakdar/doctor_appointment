import {createTheme, PaletteOptions} from '@mui/material/styles';

interface CustomPaletteOptions extends PaletteOptions {
    shadows: {
        Button: ["1px 2px 3px 0px #000"],
    };
}

export const theme = createTheme({
    shape: {
        borderRadius: 4,
    },
    palette: {
        primary: {
            light: '#dbdeff',
            main: '#757ce8',
            dark: '#673ab7',
            contrastText: '#fff',
        },
        error: {
            light: 'rgba(255,86,119,0.55)',
            main: 'rgb(255, 86, 119)',
            // main: '#B83B5E',
            dark: '#c62828',
            contrastText: '#fff',
        },
        success: {
            light: '#4caf50',
            main: 'rgb(56, 201, 121)',
            dark: '#1b5e20',
            contrastText: '#fff',
        },
        warning: {
            light: '#ff9800',
            main: 'rgb(255, 190, 81)',
            dark: '#e65100',
            contrastText: '#fff',
        },
    },
});
