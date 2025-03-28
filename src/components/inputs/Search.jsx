import PropTypes from 'prop-types'
import { Input, Select } from '.'

export function Search({ filters }) {
   return (
      <form className='flex justify-center gap-2'>
         <Input
            type='search'
            name='buscador'
            id='buscador'
            className='p-2.5'
            placeholder='Buscar ...'
         />
         <Select name='filtro' id='filtro'>
            {[...filters.keys()].map((key, index) => {
               return (
                  <option value={key} key={index}>
                     {filters.get(key)}
                  </option>
               )
            })}
         </Select>
      </form>
   )
}

Search.propTypes = {
   filters: PropTypes.instanceOf(Map).isRequired,
}
