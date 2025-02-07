/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { LoginPage } from './pages/Login.jsx'
import { PrincipalPage } from './pages/Principal.jsx'

function App() {
   const [currentPath, setCurrentPath] = useState(window.location.pathname)
   return (
      <>
         {currentPath === '/' && <PrincipalPage />}
         {currentPath === '/login' && <LoginPage />}
      </>
   )
}

export default App
