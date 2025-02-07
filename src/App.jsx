import { useState } from 'react'
import { LoginPage } from './pages/Login.jsx'

function App() {
   const [currentPath] = useState(window.location.pathname)
   return <>{currentPath === '/login' && <LoginPage />}</>
}

export default App
