import PropTypes from 'prop-types'
import { Input } from '.'
import { SearchLogo } from '../svg'

export function Search({
   className,
   onClick = null,
   placeholder = '',
   ...props
}) {
   // https://www.creative-tim.com/twcomponents/component/search-bar

   return (
      <div className='relative'>
         <Input
            type='search'
            name='search'
            placeholder={placeholder}
            className={`${className} p-2.5 pr-10`}
            {...props}
         />
         <button
            type={onClick ? 'button' : 'submit'}
            className='absolute right-1 top-2 text-gray-600'
            {...(onClick && { onClick })} // Añade la prop onClick si esta no es null
         >
            <SearchLogo />
         </button>
      </div>
   )
}

Search.propTypes = {
   className: PropTypes.string,
   onClick: PropTypes.func,
   placeholder: PropTypes.string,
}
