/* eslint-disable react/prop-types */
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'

export function AppFrame({ children }) {
   return (
      <div className='min-h-dvh min-w-max flex flex-col'>
         <Header />
         {children}
         <Footer />
      </div>
   )
}
