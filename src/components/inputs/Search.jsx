import PropTypes from 'prop-types'
import { Input } from '.'
import { SearchLogo } from '../svg'

export function Search({ className, onClick = null, ...props }) {
   return (
      <div className='relative'>
         <Input
            type='search'
            name='search'
            placeholder='Usuario'
            className={`${className} p-2.5 pr-10`}
            {...props}
         />
         <button
            type='button'
            className='absolute right-1 top-2 text-gray-600'
            onClick={onClick}
         >
            <SearchLogo />
         </button>
      </div>
   )
}

Search.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
}
