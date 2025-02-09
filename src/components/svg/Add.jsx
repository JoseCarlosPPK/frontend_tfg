/* eslint-disable react/prop-types */
export function AddLogo({
   strokeColor = 'currentColor',
   strokeWidth = 1.5,
   size = 'size-9',
}) {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         fill='none'
         viewBox='0 0 24 24'
         strokeWidth={strokeWidth}
         stroke={strokeColor}
         className={size}
      >
         <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
         />
      </svg>
   )
}
