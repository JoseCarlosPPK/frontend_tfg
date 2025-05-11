import PropTypes from 'prop-types'
import { ArrowLogo, Direccion } from '../svg'

export function ArrowButton({ direccion, size = 'size-10', ...props }) {
   return (
      <button {...props}>
         <ArrowLogo size={size} direccion={direccion} />
      </button>
   )
}

ArrowButton.propTypes = {
   direccion: PropTypes.oneOf(Object.values(Direccion)).isRequired,
   size: PropTypes.string,
}
