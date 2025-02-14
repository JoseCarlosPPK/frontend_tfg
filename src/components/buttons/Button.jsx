/* eslint-disable react/prop-types */
export function Button({ children, color, size, onclick, title }) {
   const className = `flex items-center justify-center rounded-[0.35rem] ${color} ${size}`

   return (
      <button className={className} onClick={onclick} title={title}>
         {children}
      </button>
   )
}
