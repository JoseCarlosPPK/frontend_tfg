import { AppFrame } from '../components/AppFrame.jsx'

export function LoginPage() {
   return (
      <AppFrame>
         {/* https://flowbite.com/blocks/marketing/login/ */}
         {/* Fondo */}
         <section className='flex grow place-content-center place-items-center bg-gray-50'>
            {/* Cuadro de inicio de sesión */}
            <div className='border-principal max-w-fit rounded-lg bg-white shadow-lg'>
               <div className='space-y-4 p-6'>
                  <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900'>
                     Inicio de sesión
                  </h1>
                  <form className='space-y-4 md:space-y-6' action=''>
                     <div>
                        <label
                           htmlFor='user'
                           className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                        >
                           Usuario
                        </label>
                        <input
                           type='text'
                           name='user'
                           id='user'
                           className='myoutline block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900'
                           placeholder='usuario'
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
                        <input
                           type='password'
                           name='password'
                           id='password'
                           placeholder='••••••••'
                           className='myoutline block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                           required=''
                        />
                     </div>
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
