import { Alert, Snackbar } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * Es un Snackbar personalidado basado en estos componentes de MUI:
 * - Snackbar: https://mui.com/material-ui/react-snackbar/
 * - Alert: https://mui.com/material-ui/react-alert/
 *
 * Este componente se utiliza para mostrar notificaciones/alertas que informan
 * al usuario sin que este tenga que hacer nada. Se usa en conjunto con la API
 * de useNotifications de toolpad: https://mui.com/toolpad/core/react-use-notifications/.
 * @param {object} props Propiedades que pasa la API de useNotifications
 * @returns {JSX.Element} Un Snackbar personalizado que se renderiza cuando
 * se llama al método show de useNotifications.
 */
export function CustomSnackbar(props) {
   return (
      <Snackbar
         {...props}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
         <Alert
            severity={props.children.props.children.props.severity}
            variant='filled'
            onClose={() => {
               props.onClose()
            }}
         >
            {props.children.props.children.props.children}
         </Alert>
      </Snackbar>
   )
}
CustomSnackbar.propTypes = {
   onClose: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired,
}
