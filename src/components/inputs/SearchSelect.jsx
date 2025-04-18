import PropTypes from 'prop-types'
import { Input, Select } from '.'
import { SearchLogo } from '../svg'

export function SearchSelect({ filters, handleSelectChange = null }) {
   return (
      <>
         {/* https://www.creative-tim.com/twcomponents/component/search-bar */}
         <div className='relative w-fit'>
            <Input
               type='search'
               name='search'
               placeholder='Usuario'
               className='p-2.5 pr-10'
            />
            <button
               type='submit'
               className='absolute right-1 top-2 text-gray-600'
            >
               <SearchLogo />
            </button>
         </div>
         <Select name='filter' onChange={handleSelectChange}>
            {[...filters.keys()].map((key, index) => {
               return (
                  <option value={key} key={index}>
                     {filters.get(key)}
                  </option>
               )
            })}
         </Select>
      </>
   )
}

SearchSelect.propTypes = {
   filters: PropTypes.instanceOf(Map).isRequired,
   handleSelectChange: PropTypes.func,
}
