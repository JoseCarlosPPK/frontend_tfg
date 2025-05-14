import { useNotifications } from '@toolpad/core'
import { useState } from 'react'
import { AppFrame } from '../components/AppFrame.jsx'
import { Input } from '../components/inputs'
import { AUTO_HIDE_DURATION } from '../components/snacbarks'
import { useAuth } from '../hooks'

export function LoginPage() {
   const { signIn } = useAuth()
   const [error, setError] = useState('')
   const notifications = useNotifications()

   function handleOnSubmit(event) {
      event.preventDefault()
      signIn(...new FormData(event.target).values())
         .then((esCorrecto) => {
            if (!esCorrecto) {
               setError('Credenciales incorrectas')
            }
         })
         .catch(() => {
            // alerta de error
            notifications.show('Error de conexión', {
               severity: 'error',
               autoHideDuration: AUTO_HIDE_DURATION,
            })
         })
   }

   return (
      <AppFrame>
         {/* https://flowbite.com/blocks/marketing/login/ */}
         {/* Fondo */}
         <section className='m-3 flex grow place-content-center place-items-center bg-gray-50'>
            {/* Cuadro de inicio de sesión */}
            <div className='border-principal max-w-fit rounded-lg bg-white shadow-lg'>
               <div className='space-y-4 p-6'>
                  <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900'>
                     Inicio de sesión
                  </h1>
                  <form
                     className='space-y-4 md:space-y-6'
                     onSubmit={handleOnSubmit}
                     method='post'
                     id='login'
                  >
                     <div>
                        <label
                           htmlFor='user'
                           className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                        >
                           Usuario
                        </label>
                        <Input
                           type='text'
                           name='user'
                           id='user'
                           placeholder='usuario'
                           className='p-2.5'
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor='password'
                           className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                        >
                           Contraseña
                        </label>
                        <Input
                           type='password'
                           name='password'
                           id='password'
                           placeholder='••••••••'
                           className='p-2.5'
                           required=''
                        />
                     </div>
                     {error && (
                        <div className='text-center text-red-600'>
                           <p>{error}</p>
                        </div>
                     )}
                     <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center'>
                           <input
                              id='remember'
                              aria-describedby='remember'
                              type='checkbox'
                              className='h-4 w-4 rounded border border-gray-300 bg-gray-50'
                              required=''
                           />

                           <label
                              htmlFor='remember'
                              className='ml-1 text-sm text-gray-500'
                           >
                              Recordarme
                           </label>
                        </div>
                        <a
                           href=''
                           className='text-sm font-medium hover:underline'
                        >
                           Recuperar contraseña
                        </a>
                     </div>
                     <button
                        type='submit'
                        className='bg-principal w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium'
                     >
                        Iniciar sesión
                     </button>
                  </form>
               </div>
            </div>
         </section>
      </AppFrame>
   )
}
