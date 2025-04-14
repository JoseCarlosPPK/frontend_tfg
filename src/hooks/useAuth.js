import { useContext } from 'react'
import { AuthContext } from '../contexts/auth/AuthContext.jsx'

export function useAuth() {
   const { setIsAuth } = useContext(AuthContext)

   function signIn(username, password) {
      return fetch('http://localhost:5000/api/auth', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         // https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors#credentials-are-a-special-case
         credentials: 'include',
         body: JSON.stringify({ username: username, password: password }),
      })
         .then((res) => {
            setIsAuth(res.ok)
            return res.ok
         })
         .catch(() => {
            setIsAuth(false)
            return false
         })
   }

   function signOut() {
      document.cookie = 'csrf_access_token=; Max-Age=0; path=/;'

      setIsAuth(false)
   }

   return { signIn, signOut }
}
