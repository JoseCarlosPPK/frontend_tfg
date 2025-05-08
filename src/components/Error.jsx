import PropTypes from 'prop-types'

export function Error({ children }) {
   return <p className='text-red-600'>{children}</p>
}

Error.propTypes = {
   children: PropTypes.node.isRequired,
}
