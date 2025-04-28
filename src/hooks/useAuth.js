import { useContext } from 'react'
import { AuthContext } from '../contexts/auth/AuthContext.jsx'
import { request } from '../services'

export function useAuth() {
   const { setIsAuth } = useContext(AuthContext)

   function signIn(username, password) {
      return request.auth(username, password).then((res) => {
         setIsAuth(res.ok)
         return res.ok
      })
   }

   function signOut() {
      document.cookie = 'csrf_access_token=; Max-Age=0; path=/;'

      setIsAuth(false)
   }

   return { signIn, signOut }
}
