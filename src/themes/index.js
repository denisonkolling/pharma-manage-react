import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#ab9be3',
      dark: '#757ce8',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#cab6fa',
      dark: '#ba000d',
      contrastText: '#9370db',
    },
    action: {
      hover: '#cab6fa',
    },
  },
});


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#9c4dcc',
      main: '#7e57c2',
      dark: '#5d177a', 
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#d1c4e9',
      main: '#b39ddb',
      dark: '#836fa9',
      contrastText: '#000000',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    action: {
      hover: '#cab6fa',
    },
  },
});