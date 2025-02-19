import { createTheme } from '@mui/material'

export const Theme = createTheme({
   cssVariables: true, //
   cssVarPrefix: '', // Por defecto es --mui
   palette: {
      primary: {
         main: '#662780',
      },
      secondary: {
         main: '#9537bb',
      },
      terciary: {
         main: '#ecb9e7',
      },
   },
})
