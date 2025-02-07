/* eslint-disable react/prop-types */
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'
import { Navigation } from './Navigation.jsx'

export function AppFrame({ children }) {
   return (
      <div className='min-h-dvh min-w-max flex flex-col'>
         <Header />
         {children}
         <Footer />
      </div>
   )
}

export function AppNavFrame({ children }) {
   return (
      <AppFrame>
         <Navigation />
         {children}
      </AppFrame>
   )
}
