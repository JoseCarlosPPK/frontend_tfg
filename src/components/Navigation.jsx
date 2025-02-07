/* eslint-disable react/prop-types */
export function Navigation() {
   return (
      <nav className='flex justify-between bg-secundario py-3 px-5'>
         <ol className='flex gap-6'>
            <NavItem href='/'>Administración</NavItem>
            <NavItem href='/'>Centros</NavItem>
            <NavItem href='/'>Convocatorias</NavItem>
            <NavItem href='/'>Correo</NavItem>
         </ol>

         <a href='/login' className='hover-resize'>
            <svg
               width='25'
               height='25'
               viewBox='0 0 48 48'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  d='M18 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H18M32 34L42 24M42 24L32 14M42 24H18'
                  stroke='#F5F5F5'
                  strokeWidth='4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
            </svg>
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
            <span className='absolute -bottom-1 left-1/2 w-0 transition-all duration-300 h-[3px] bg-white group-hover:w-3/6'></span>
            <span className='absolute -bottom-1 right-1/2 w-0 transition-all duration-300 h-[3px] bg-white group-hover:w-3/6'></span>
         </a>
      </li>
   )
}
