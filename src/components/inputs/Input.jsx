import PropTypes from 'prop-types'

export function Input({ className, ...props }) {
   const customClassName = `${className} rounded-lg block border border-gray-400 bg-gray-50 myoutline p-1 text-gray-900`

   return <input className={customClassName} {...props} />
}

Input.propTypes = {
   className: PropTypes.string,
}
