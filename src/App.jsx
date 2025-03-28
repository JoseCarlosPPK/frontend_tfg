/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
   CentrosPage,
   ConvocatoriasAddPage,
   ConvocatoriasPage,
   LoginPage,
   PrincipalPage,
} from './pages'

import { Routes } from './routes.js'

function App() {
   const [currentPath, setCurrentPath] = useState(window.location.pathname)
   return (
      <>
         {currentPath === Routes.Home && <PrincipalPage />}
         {currentPath === Routes.Login && <LoginPage />}
         {currentPath === Routes.Centros && <CentrosPage />}
         {currentPath === Routes.Convocatorias && <ConvocatoriasPage />}
         {currentPath === Routes.ConvocatoriasAdd && <ConvocatoriasAddPage />}
         {currentPath === Routes.ConvocatoriasEdit && <ConvocatoriasAddPage />}
         {currentPath === Routes.ConvocatoriasSee && <ConvocatoriasAddPage />}
      </>
   )
}

export default App
