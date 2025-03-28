/* eslint-disable react/prop-types */
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'
import { Navigation } from './Navigation.jsx'

export function AppFrame({ children }) {
   return (
      <div className='flex min-h-screen min-w-max flex-col'>
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
         <div className='m-5 flex h-full grow flex-col'>{children}</div>
      </AppFrame>
   )
}
