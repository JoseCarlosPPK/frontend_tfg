export function Header() {
   return (
      <header className='bg-principal flex items-center gap-4 p-3'>
         <a href='/'>
            <svg
               width='40'
               height='40'
               viewBox='0 0 66 66'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  d='M33 22C26.9249 22 22 26.9249 22 33C22 39.0751 26.9249 44 33 44C39.0751 44 44 39.0751 44 33C44 26.9249 39.0751 22 33 22ZM33 22H58.2175M10.8625 16.665L23.485 38.5M29.92 60.335L42.515 38.5M60.5 33C60.5 48.1878 48.1878 60.5 33 60.5C17.8122 60.5 5.5 48.1878 5.5 33C5.5 17.8122 17.8122 5.5 33 5.5C48.1878 5.5 60.5 17.8122 60.5 33Z'
                  stroke='#FFFFFF'
                  strokeWidth='4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               />
            </svg>
         </a>

         <a href='/'>
            <h2 className='app-name'>Nombre App</h2>
         </a>
      </header>
   )
}
