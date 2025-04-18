import { Input } from '.'
import { SearchLogo } from '../svg'

export function Search({ ...props }) {
   return (
      <div className='relative'>
         <Input
            type='search'
            name='search'
            placeholder='Usuario'
            className='p-2.5 pr-10'
            {...props}
         />
         <button type='submit' className='absolute right-1 top-2 text-gray-600'>
            <SearchLogo />
         </button>
      </div>
   )
}
