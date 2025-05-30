import { AppProvider, NotificationsProvider } from '@toolpad/core'
import { RouterProvider } from 'react-router'
import { AuthRequired } from './components/AuthRequired.jsx'
import { CustomSnackbar } from './components/snacbarks/CustomSnackbar.jsx'
import { AuthProvider } from './contexts/auth'
import { LoginPage } from './pages'
import { router } from './router.jsx'

function App() {
   return (
      <AuthProvider>
         {/* Añadido de MUI */}
         <AppProvider>
            {/* https://mui.com/toolpad/core/react-use-notifications/#customization */}
            <NotificationsProvider slots={{ snackbar: CustomSnackbar }}>
               <AuthRequired defaultComponent={LoginPage}>
                  <RouterProvider router={router} />
               </AuthRequired>
            </NotificationsProvider>
         </AppProvider>
      </AuthProvider>
   )
}

export default App
