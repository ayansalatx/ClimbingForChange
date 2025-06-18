import { createTheme } from '@mui/material'

// Theme to override MUI defaults
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#191447',
      light: '#2e2958',
      dark: '#0d0a24',
    },
    secondary: {
      main: '#cddc29',
    },
    error: {
      main: '#d56d6d',
      light: '#d97a7a',
    },
    warning: {
      main: '#ea9055',
    },
    info: {
      main: '#3db7c6',
      light: '#8bd4e0',
    },
    success: {
      main: '#8bb73f',
    },
    gray: {
      main: '#9f9898',
      light: '#dddbdb',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'canada-type-gibson, "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default theme
