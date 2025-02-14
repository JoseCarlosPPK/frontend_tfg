import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { ImageLink } from '../components/ImageLink.jsx'

export function AdminPage() {
   return (
      <AppNavFrame>
         <header className='m-5'>
            <h1 className='text-3xl font-bold'>Administración</h1>
            <Breadcrumb />
         </header>
         <div className='mygrid m-5 grow content-center justify-center gap-8'>
            <ImageLink title='Usuarios' href={'/'} />
            <ImageLink title='Registros' href={'/'} />
         </div>
      </AppNavFrame>
   )
}
