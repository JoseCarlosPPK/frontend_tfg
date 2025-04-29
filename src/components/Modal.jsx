import { Dialog } from '@mui/material'
import PropTypes from 'prop-types'
// Copiado y modificado de:
// https://flowbite.com/docs/components/modal/
// https://github.com/JoseCarlosPPK/centros_farmacia

export function Modal({
   open,
   children,
   onClose,
   onConfirm = null,
   closeText = 'Cancelar',
   confirmText = 'Aceptar',
   title = null,
   opacity = 0.6,
   showHeader = true,
   confirmColorClassName = 'blue',
   dialogProps,
}) {
   const confirmShapeClassName =
      'rounded-lg px-5 py-2.5 text-center text-sm font-medium'

   const colorClassName = {
      red: 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-white',
      blue: 'bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-white',
   }

   const confirmClassName = `${confirmShapeClassName} ${colorClassName[confirmColorClassName]}`

   // Dialog tiene una prop que es onClose. No la vamos a usar. Sirve para que
   // se ejecute una función cuando se presiona la tecla Esc o se clicka sobre
   // el fondo

   return (
      <Dialog
         open={open}
         sx={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
         {...dialogProps}
         closeAfterTransition={false} // https://stackoverflow.com/questions/79006592/aria-hidden-warning-on-closing-mui-dialogue
      >
         <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
            {/* Modal header */}
            {showHeader && (
               <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5'>
                  <h2 className='h2'>{title}</h2>
                  <button
                     type='button'
                     className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                     onClick={onClose}
                  >
                     <svg
                        className='h-3 w-3'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'
                     >
                        <path
                           stroke='currentColor'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                     </svg>
                     <span className='sr-only'>Close modal</span>
                  </button>
               </div>
            )}

            {/* Modal body */}
            <div className='space-y-4 p-4 md:p-5'>{children}</div>
            {/* Modal footer */}
            <div className='flex items-center justify-end gap-4 rounded-b border-t border-gray-200 p-4 dark:border-gray-600'>
               <button
                  type='button'
                  className='rounded-lg border border-gray-400/80 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-1 focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white'
                  onClick={onClose}
               >
                  {closeText}
               </button>

               {onConfirm && (
                  <button
                     type='button'
                     className={confirmClassName}
                     onClick={onConfirm}
                  >
                     {confirmText}
                  </button>
               )}
            </div>
         </div>
      </Dialog>
   )
}

Modal.propTypes = {
   open: PropTypes.bool.isRequired,
   children: PropTypes.node,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func,
   closeText: PropTypes.string,
   confirmText: PropTypes.string,
   title: PropTypes.string,
   opacity: PropTypes.number,
   showHeader: PropTypes.bool,
   confirmColorClassName: PropTypes.string,
   dialogProps: PropTypes.object,
}
