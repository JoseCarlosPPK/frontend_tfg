import PropTypes from 'prop-types'
import { Search, Select } from '.'

export function SearchSelect({ filters, handleSelectChange = null, ...props }) {
   return (
      <>
         <Search {...props} />
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
   placeholder: PropTypes.string,
   searchClassName: PropTypes.string,
   onClick: PropTypes.func,
}
