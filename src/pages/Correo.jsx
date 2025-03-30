import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'

export function CorreoPage() {
   return (
      <AppNavFrame>
         <header className='my-2 flex justify-between'>
            <div>
               <Breadcrumb />
               <h1 className='h1 mt-2'>Correo</h1>
            </div>
            <div>
               <span className='text-lg font-bold'>uncorreo@example.com</span>
            </div>
         </header>
      </AppNavFrame>
   )
}
