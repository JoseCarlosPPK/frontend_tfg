import PropTypes from 'prop-types'
import { Modal } from '../../components/Modal.jsx'

export function ModalDelete({ open, centro, onClose, onConfirm }) {
   return (
      <Modal
         open={open}
         onClose={onClose}
         confirmText='Borrar'
         title={`Borrar ${centro.nombre}`}
         confirmColorClassName='red'
         onConfirm={onConfirm}
      >
         <p>
            ¿Está seguro de que quiere borrar el centro {centro.nombre}? Una vez
            hecho, no habrá vuelta atrás.
         </p>
      </Modal>
   )
}

ModalDelete.propTypes = {
   open: PropTypes.bool.isRequired,
   centro: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
   }).isRequired,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func.isRequired,
}
