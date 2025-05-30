import logo_registros from '../../assets/logo_registros.svg' // https://www.svgrepo.com/
import logo_users from '../../assets/logo_users.svg' // https://www.svgrepo.com
import { AppNavFrame } from '../../components/AppFrame.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { ImageLink } from '../../components/ImageLink.jsx'
import { routes } from '../../router.jsx'

export function AdminPage() {
   return (
      <AppNavFrame>
         <header className='my-2'>
            <Breadcrumb />
            <h1 className='h1 mt-2'>Administración</h1>
         </header>
         <div className='mygrid m-5 grow content-center justify-center gap-8'>
            <ImageLink
               title='Registros'
               href={routes.AdminRegistros}
               imgSrc={logo_registros}
            />
            <ImageLink
               title='Usuarios'
               href={routes.AdminUsuarios}
               imgSrc={logo_users}
            />
         </div>
      </AppNavFrame>
   )
}
