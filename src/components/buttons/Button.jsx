/* eslint-disable react/prop-types */
export function Button({ children, color, size, ...props }) {
   const className = `flex items-center justify-center rounded-[0.35rem] ${color} ${size}`

   return (
      <button className={className} {...props}>
         {children}
      </button>
   )
}
