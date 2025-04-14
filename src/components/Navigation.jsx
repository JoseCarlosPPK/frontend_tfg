/* eslint-disable react/prop-types */
import { useAuth } from '../hooks/useAuth.js'
import { Routes } from '../routes.js'
import { LogoutLogo } from './svg'

export function Navigation() {
   const { signOut } = useAuth()

   return (
      <nav className='bg-secundario flex justify-between px-5 py-3'>
         <ol className='flex gap-6'>
            <NavItem href={Routes.Admin}>Administración</NavItem>
            <NavItem href={Routes.Centros}>Centros</NavItem>
            <NavItem href={Routes.Convocatorias}>Convocatorias</NavItem>
            <NavItem href={Routes.Correo}>Correo</NavItem>
         </ol>

         <a href='' onClick={signOut} className='hover-resize'>
            <LogoutLogo />
         </a>
      </nav>
   )
}

function NavItem({ href, children }) {
   return (
      <li className='hover-resize group relative'>
         <a href={href}>
            {children}
            {/* https://pagedone.io/docs/hover-effect */}
            <span className='absolute -bottom-1 left-1/2 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-3/6'></span>
            <span className='absolute -bottom-1 right-1/2 h-[3px] w-0 bg-white transition-all duration-300 group-hover:w-3/6'></span>
         </a>
      </li>
   )
}
