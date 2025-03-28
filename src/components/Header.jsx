import { AppLogo } from './svg'

export function Header() {
   return (
      <header className='bg-principal flex items-center gap-4 p-3'>
         <a href='/'>
            <AppLogo />
         </a>

         <a href='/'>
            <h2 className='app-name'>Nombre App</h2>
         </a>
      </header>
   )
}
