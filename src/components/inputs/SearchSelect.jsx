import PropTypes from 'prop-types'
import { Search, Select } from '.'

export function SearchSelect({ filters, handleSelectChange = null, ...props }) {
   return (
      <>
         <Search {...props} />
         <Select name='filter' onChange={handleSelectChange}>
            {filters.map((filtro, index) => {
               return (
                  <option value={filtro.name} key={index}>
                     {filtro.label}
                  </option>
               )
            })}
         </Select>
      </>
   )
}

SearchSelect.propTypes = {
   filters: PropTypes.arrayOf(
      PropTypes.shape({
         label: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
      })
   ).isRequired,
   handleSelectChange: PropTypes.func,
   placeholder: PropTypes.string,
   searchClassName: PropTypes.string,
   onClick: PropTypes.func,
}
