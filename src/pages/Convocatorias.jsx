import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton } from '../components/buttons/AddButton.jsx'

export function ConvocatoriasPage() {
   return (
      <AppNavFrame>
         <div className='m-3 grow'>
            <header className='my-2'>
               <Breadcrumb />

               <div className='mt-2 flex items-center gap-2'>
                  <h1 className='h1'>Convocatorias</h1>
                  <a href=''>
                     <AddButton title='Crear una nueva convocatoria' />
                  </a>
               </div>
            </header>

            {/* Listado de convocatorias por curso */}
         </div>
      </AppNavFrame>
   )
}
