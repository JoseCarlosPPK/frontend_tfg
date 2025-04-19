import PropTypes from 'prop-types'
import { useState } from 'react'
import { AuthContext } from './AuthContext.jsx'

export function AuthProvider({ children }) {
   const [isAuth, setIsAuth] = useState(
      document.cookie.includes('csrf_access_token')
   )

   return (
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
         {children}
      </AuthContext.Provider>
   )
}

AuthProvider.propTypes = {
   children: PropTypes.node.isRequired,
}
