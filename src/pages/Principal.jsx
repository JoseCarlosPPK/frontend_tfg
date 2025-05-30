import admin_logo from '../assets/logo_admin.svg' //https://www.veryicon.com/icons/miscellaneous/yuanql/icon-admin.html
import logo_centros from '../assets/logo_centros.jpg'
import logo_convocatorias from '../assets/logo_convocatorias.jpeg'
import mail_logo from '../assets/logo_mail.svg'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { ImageLink } from '../components/ImageLink.jsx'
import { routes } from '../router.jsx'

export function PrincipalPage() {
   return (
      <AppNavFrame>
         <div className='mygrid m-5 grow content-center justify-center gap-8'>
            <ImageLink
               title='Administración'
               href={routes.Admin}
               imgSrc={admin_logo}
            />
            <ImageLink
               title='Centros'
               href={routes.Centros}
               imgSrc={logo_centros}
            />
            <ImageLink
               title='Convocatorias'
               href={routes.Convocatorias}
               imgSrc={logo_convocatorias}
            />
            <ImageLink title='Correo' href={routes.Correo} imgSrc={mail_logo} />
         </div>
      </AppNavFrame>
   )
}
