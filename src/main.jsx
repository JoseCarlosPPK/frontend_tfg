import { ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style/index.css'
import { Theme } from './style/theme.js'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <ThemeProvider theme={Theme}>
         <App />
      </ThemeProvider>
   </StrictMode>
)
