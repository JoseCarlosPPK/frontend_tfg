/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
   CentrosPage,
   ConvocatoriasAddPage,
   ConvocatoriasPage,
   CorreoPage,
   LoginPage,
   PrincipalPage,
} from './pages'

import { AuthRequired } from './components/AuthRequired.jsx'
import { AuthProvider } from './contexts/auth'
import { AdminPage, RegistrosPage, UsuariosPage } from './pages/admin'
import { Routes } from './routes.js'

function App() {
   const [currentPath, setCurrentPath] = useState(window.location.pathname)
   return (
      <AuthProvider>
         <AuthRequired defaultComponent={LoginPage}>
            {currentPath === Routes.Home && <PrincipalPage />}
            {currentPath === Routes.Centros && <CentrosPage />}
            {currentPath === Routes.Convocatorias && <ConvocatoriasPage />}
            {currentPath === Routes.ConvocatoriasAdd && (
               <ConvocatoriasAddPage />
            )}
            {currentPath === Routes.ConvocatoriasEdit && (
               <ConvocatoriasAddPage />
            )}
            {currentPath === Routes.ConvocatoriasSee && (
               <ConvocatoriasAddPage />
            )}
            {currentPath === Routes.Admin && <AdminPage />}
            {currentPath === Routes.AdminRegistros && <RegistrosPage />}
            {currentPath === Routes.AdminUsuarios && <UsuariosPage />}
            {currentPath === Routes.Correo && <CorreoPage />}
         </AuthRequired>
      </AuthProvider>
   )
}

export default App
