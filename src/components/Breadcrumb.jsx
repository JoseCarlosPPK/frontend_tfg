import { HomeLogo } from './svg/Home.jsx'

export function Breadcrumb() {
   const pahtname = window.location.pathname
   const segments = pahtname.split('/')
   // Como el pathname siempre comienza por /, eliminamos el primer
   // elemento que siempre será vacío
   segments.shift()

   // Esta parte sirve para ir reconstruyendo el path según
   // se avance en el Breadcrumb, para ponerlo como "href"
   let path = ''
   function add_path(route) {
      path += `/${route}`
   }

   return (
      <ol className='flex items-center'>
         <li className='mx-1'>
            <a href='/'>
               <HomeLogo />
            </a>
         </li>

         {segments.map((e, i) => (
            <li key={i} className='before:content-["/"]'>
               {add_path(e)}
               <a href={path} className='mx-1'>
                  {e}
               </a>
            </li>
         ))}
      </ol>
   )
}
