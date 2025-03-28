import PropTypes from 'prop-types'

export function Select({ className, children, ...props }) {
   const customClassName = `${className} myoutline rounded-lg p-2`

   return (
      <select className={customClassName} {...props}>
         {children}
      </select>
   )
}

Select.propTypes = {
   className: PropTypes.string,
   children: PropTypes.node,
}
