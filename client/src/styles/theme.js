import { createTheme } from '@mui/material'

// Theme to override MUI defaults
const themeOptions = createTheme({
  typography: {
    fontFamily: 'canada-type-gibson, sans-serif',
  },
  palette: {
    primary: {
      main: '#FFFFFF',
    },

    secondary: {
      main: '#000000',
    },

    c4c: {
      purple: '#191447',
      darkPurple: '#0d0a24',
      medPurple: '#2e2958',
      teal: '#3db7c6',
      lightBlue: '#8bd4e0',
      green: '#cddc29',
      darkCoral: '#d56d6d',
      lightCoral: '#d97a7a',
      lightGray: '#dddbdb',
      medGray: '#9f9898',
    },
  },
  components: {},
})

export default themeOptions
