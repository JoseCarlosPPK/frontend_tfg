import PropTypes from 'prop-types'
import { Arrow } from '../svg/Arrow.jsx'
import { Direccion } from '../svg/arrow_direction.js'

export function ArrowButton({ direccion, ...props }) {
   return (
      <button {...props}>
         <Arrow direccion={direccion} />
      </button>
   )
}

ArrowButton.propTypes = {
   direccion: PropTypes.oneOf(Object.values(Direccion)).isRequired,
}
