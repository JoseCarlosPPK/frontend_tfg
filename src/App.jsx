/* eslint-disable no-unused-vars */

import { AppProvider, NotificationsProvider } from '@toolpad/core'
import { useState } from 'react'
import { AuthRequired } from './components/AuthRequired.jsx'
import { CustomSnackbar } from './components/snacbarks/CustomSnackbar.jsx'
import { AuthProvider } from './contexts/auth'
import {
   CentrosPage,
   ConvocatoriasAddPage,
   ConvocatoriasPage,
   CorreoPage,
   LoginPage,
   PrincipalPage,
} from './pages'
import { AdminPage, RegistrosPage, UsuariosPage } from './pages/admin'
import { Routes } from './routes.js'

function App() {
   const [currentPath, setCurrentPath] = useState(window.location.pathname)
   return (
      <AuthProvider>
         {/* Añadido de MUI */}
         <AppProvider>
            {/* https://mui.com/toolpad/core/react-use-notifications/#customization */}
            <NotificationsProvider slots={{ snackbar: CustomSnackbar }}>
               <AuthRequired defaultComponent={LoginPage}>
                  {currentPath === Routes.Home && <PrincipalPage />}
                  {currentPath === Routes.Centros && <CentrosPage />}
                  {currentPath === Routes.Convocatorias && (
                     <ConvocatoriasPage />
                  )}
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
            </NotificationsProvider>
         </AppProvider>
      </AuthProvider>
   )
}

export default App
