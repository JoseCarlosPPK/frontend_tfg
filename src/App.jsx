/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { CentrosPage } from './pages/Centros.jsx'
import { LoginPage } from './pages/Login.jsx'
import { PrincipalPage } from './pages/Principal.jsx'

function App() {
   const [currentPath, setCurrentPath] = useState(window.location.pathname)
   return (
      <>
         {currentPath === '/' && <PrincipalPage />}
         {currentPath === '/login' && <LoginPage />}
         {currentPath === '/centros' && <CentrosPage />}
      </>
   )
}

export default App
