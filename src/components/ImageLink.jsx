/* eslint-disable react/prop-types */
import { Link } from 'react-router'

export function ImageLink({ imgSrc, title, href }) {
   return (
      <Link to={href} className='hover-resize max-w-56'>
         <div className='bg-terciario justify-center justify-items-center rounded-xl p-3'>
            <img
               src={imgSrc}
               alt={title}
               className='aspect-video h-full w-full rounded-lg object-fill'
            />
            <h2 className='mt-2 text-center'>{title}</h2>
         </div>
      </Link>
   )
}
