/* eslint-disable react/prop-types */

export function ImageLink({ imgSrc, title, href }) {
   return (
      <a href={href} className='hover-resize max-w-56'>
         <div className='bg-terciario rounded-xl p-3 justify-center justify-items-center'>
            <img
               src={imgSrc}
               alt={title}
               className='w-full h-full aspect-video rounded-lg object-fill'
            />
            <h2 className='mt-2'>{title}</h2>
         </div>
      </a>
   )
}
