import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth/AuthContext.jsx'

export function AuthRequired({ children, defaultComponent: Component }) {
   const { isAuth } = useContext(AuthContext)

   return isAuth ? <>{children}</> : <Component />
}

AuthRequired.propTypes = {
   children: PropTypes.node.isRequired,
   defaultComponent: PropTypes.elementType.isRequired,
}
