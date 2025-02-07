import { AppFrame } from '../components/AppFrame.jsx'

export function LoginPage() {
   return (
      <AppFrame>
         {/* https://flowbite.com/blocks/marketing/login/ */}
         {/* Fondo */}
         <section className='grow bg-gray-50 content-center place-items-center'>
            {/* Cuadro de inicio de sesión */}
            <div className='max-w-fit border-principal bg-white rounded-lg shadow-lg'>
               <div className='p-6 space-y-4'>
                  <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900'>
                     Inicio de sesión
                  </h1>
                  <form className='space-y-4 md:space-y-6' action=''>
                     <div>
                        <label
                           htmlFor='user'
                           className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                           Usuario
                        </label>
                        <input
                           type='text'
                           name='user'
                           id='user'
                           className='bg-gray-50 border  text-gray-900
                           myoutline rounded-lg block w-full p-2.5'
                           placeholder='usuario'
                           required
                        />
                     </div>
                     <div>
                        <label
                           htmlFor='password'
                           className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                           Contraseña
                        </label>
                        <input
                           type='password'
                           name='password'
                           id='password'
                           placeholder='••••••••'
                           className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg myoutline block w-full p-2.5 '
                           required=''
                        />
                     </div>
                     <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                           <input
                              id='remember'
                              aria-describedby='remember'
                              type='checkbox'
                              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 '
                              required=''
                           />

                           <label
                              htmlFor='remember'
                              className='text-gray-500 ml-2 text-sm'
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
                        className='w-full bg-principal font-medium rounded-lg text-sm px-5 py-2.5 text-center'
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
