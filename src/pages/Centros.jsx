import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton } from '../components/buttons/AddButton.jsx'

export function CentrosPage() {
   return (
      <AppNavFrame>
         <div className='m-3 grow'>
            <header className='my-2'>
               <Breadcrumb />

               <div className='mt-2 flex items-center gap-2'>
                  <h1 className='h1'>Centros</h1>
                  <AddButton title='Añadir un nuevo centro' />
               </div>
            </header>

            <main>
               {/* Search input and filters */}
               <div>
                  <form className='flex justify-center gap-2'>
                     <input
                        type='text'
                        name='buscador'
                        className='myoutline block rounded-lg border bg-gray-50 p-2.5 text-gray-900'
                        placeholder='Buscar ...'
                     />
                     <select
                        name='filtros'
                        className='myoutline rounded-lg p-1'
                     >
                        <option value='nombre'>Nombre del centro</option>
                        <option value='responsable'>Tutor</option>
                        <option value='localidad'>Localidad</option>
                        <option value='provincia'>Provincia</option>
                        <option value='cp'>Código Postal</option>
                        <option value='correo'>Correo electrónico</option>
                        <option value='telefono'>Teléfono</option>
                        <option value='movil'>Móvil</option>
                     </select>
                  </form>
               </div>
            </main>
         </div>
      </AppNavFrame>
   )
}
