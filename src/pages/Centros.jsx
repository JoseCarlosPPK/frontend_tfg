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

            <main></main>
         </div>
      </AppNavFrame>
   )
}
