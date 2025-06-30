import PropTypes from 'prop-types'
import { Modal } from '../../components/Modal.jsx'

export function ModalDelete({ open, convocatoria, onClose, onConfirm }) {
   return (
      <Modal
         open={open}
         onClose={onClose}
         confirmText='Borrar'
         title='Borrar convocatoria'
         confirmColorClassName='red'
         onConfirm={onConfirm}
      >
         <p>
            ¿Quiere borrar la convocatoria del{' '}
            <span className='font-bold'>
               {convocatoria.fecha_ini.toLocaleDateString('es-ES')}
            </span>{' '}
            al{' '}
            <span className='font-bold'>
               {convocatoria.fecha_fin.toLocaleDateString('es-ES')}
            </span>
            ?
         </p>
      </Modal>
   )
}

ModalDelete.propTypes = {
   open: PropTypes.bool.isRequired,
   convocatoria: PropTypes.shape({
      fecha_ini: PropTypes.any.isRequired,
      fecha_fin: PropTypes.any.isRequired,
   }).isRequired,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func.isRequired,
}
