import PropTypes from 'prop-types'
import { ArrowLogo, Direccion } from '../svg'

export function ArrowButton({ direccion, ...props }) {
   return (
      <button {...props}>
         <ArrowLogo direccion={direccion} />
      </button>
   )
}

ArrowButton.propTypes = {
   direccion: PropTypes.oneOf(Object.values(Direccion)).isRequired,
}
