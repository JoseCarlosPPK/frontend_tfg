/* eslint-disable react/prop-types */
import { Link } from 'react-router'
import { useAuth } from '../hooks'
import { routes } from '../router.jsx'
import { LogoutLogo } from './svg'

export function Navigation() {
   const { signOut } = useAuth()

   return (
      <nav className='bg-secundario flex justify-between px-5 py-3'>
         <ol className='flex gap-6'>
            <NavItem href={routes.Admin}>Administración</NavItem>
            <NavItem href={routes.Centros}>Centros</NavItem>
            <NavItem href={routes.Convocatorias}>Convocatorias</NavItem>
            <NavItem href={routes.Correo}>Correo</NavItem>
         </ol>

         <Link to='' onClick={signOut} className='hover-resize'>
            <LogoutLogo />
         </Link>
      </nav>
   )
}

function NavItem({ href, children }) {
   return (
      <li className='hover-resize group relative'>
         <Link to={href}>
            {children}
            {/* https://pagedone.io/docs/hover-effect */}
            <span className='absolute -bottom-1 left-1/2 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-3/6'></span>
            <span className='absolute -bottom-1 right-1/2 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-3/6'></span>
         </Link>
      </li>
   )
}
