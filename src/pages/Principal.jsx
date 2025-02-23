import admin_logo from '../assets/logo_admin.svg' //https://www.veryicon.com/icons/miscellaneous/yuanql/icon-admin.html
import logo_centros from '../assets/logo_centros.jpg'
import logo_convocatorias from '../assets/logo_convocatorias.jpeg'
import mail_logo from '../assets/logo_mail.svg'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { ImageLink } from '../components/ImageLink.jsx'
import { Routes } from '../routes.js'

export function PrincipalPage() {
   return (
      <AppNavFrame>
         <div className='mygrid m-5 grow content-center justify-center gap-8'>
            <ImageLink
               title='Administración'
               href={Routes.Admin}
               imgSrc={admin_logo}
            />
            <ImageLink
               title='Centros'
               href={Routes.Centros}
               imgSrc={logo_centros}
            />
            <ImageLink
               title='Convocatorias'
               href={Routes.Convocatorias}
               imgSrc={logo_convocatorias}
            />
            <ImageLink title='Correo' href={Routes.Correo} imgSrc={mail_logo} />
         </div>
      </AppNavFrame>
   )
}
