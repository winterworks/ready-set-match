import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

import './global.css'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#5F699E',
    },
    error: {
      main: red.A400,
    },
  },
})

export default responsiveFontSizes(theme)
