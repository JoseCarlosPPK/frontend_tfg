import admin_logo from '../assets/admin_logo.svg' //https://www.veryicon.com/icons/miscellaneous/yuanql/icon-admin.html
import logo_centros from '../assets/logo_centros.jpg'
import logo_convocatorias from '../assets/logo_convocatorias.jpeg'
import mail_logo from '../assets/mail_logo.svg'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { ImageLink } from '../components/ImageLink.jsx'

export function PrincipalPage() {
   return (
      <AppNavFrame>
         <div className='m-5 grow mygrid gap-8 justify-center content-center'>
            <ImageLink title='Administración' href={'/'} imgSrc={admin_logo} />
            <ImageLink title='Centros' href={'/'} imgSrc={logo_centros} />
            <ImageLink
               title='Convocatorias'
               href={'/'}
               imgSrc={logo_convocatorias}
            />
            <ImageLink title='Correo' href={'/'} imgSrc={mail_logo} />
         </div>
      </AppNavFrame>
   )
}
