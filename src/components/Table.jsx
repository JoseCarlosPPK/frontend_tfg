import PropTypes from 'prop-types'

export function Table({ columns, data, checked }) {
   return (
      <table className='mytable w-full'>
         <thead>
            <tr className='bg-secundario'>
               {checked && (
                  <th>
                     <div className='flex justify-center'>
                        <input
                           type='checkbox'
                           name='chk'
                           id='chk_1'
                           className='size-6 self-center'
                        />
                     </div>
                  </th>
               )}
               {columns.map((column, index) => {
                  return <th key={index}>{column.name}</th>
               })}
            </tr>
         </thead>
         <tbody>
            {data.map((row) => {
               return (
                  <tr key={row.id}>
                     {checked && (
                        <td>
                           <div className='flex justify-center'>
                              <input
                                 type='checkbox'
                                 name='chk'
                                 id={`chk_${row.id}`}
                                 className='size-5 self-center'
                              />
                           </div>
                        </td>
                     )}
                     {columns.map((column) => {
                        return column.createCell(row)
                     })}
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}

Table.propTypes = {
   columns: PropTypes.arrayOf(
      PropTypes.shape({
         name: PropTypes.any.isRequired,
         createCell: PropTypes.func.isRequired,
      })
   ).isRequired,
   data: PropTypes.array.isRequired,
   checked: PropTypes.bool,
}
