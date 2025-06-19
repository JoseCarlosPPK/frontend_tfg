import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

export function Table({
   columns,
   data,
   checked,
   selected,
   toggleSelected,
   total,
   onSelectAllClick,
}) {
   const checkboxRef = useRef(null)

   useEffect(() => {
      if (checkboxRef.current) {
         checkboxRef.current.indeterminate =
            selected.size > 0 && selected.size < total
      }
   }, [total, selected])

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
                           ref={checkboxRef}
                           id='chk_1'
                           className='size-6 self-center'
                           onClick={onSelectAllClick}
                           checked={selected.size == total}
                           onChange={() => {}}
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
            {data.map((row, index) => {
               return (
                  <tr
                     key={row.id}
                     {...(checked && {
                        onDoubleClick: () => {
                           toggleSelected(row)
                        },
                     })}
                     className='hover:cursor-pointer'
                  >
                     {checked && (
                        <td>
                           <div className='flex justify-center'>
                              <input
                                 type='checkbox'
                                 name='chk'
                                 id={`chk_${row.id}`}
                                 className='size-5 self-center'
                                 checked={selected.has(row.id)}
                                 onChange={() => {
                                    toggleSelected(row)
                                 }}
                              />
                           </div>
                        </td>
                     )}
                     {columns.map((column) => {
                        return column.createCell(row, index)
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
   selected: PropTypes.object,
   toggleSelected: PropTypes.func,
   total: PropTypes.number,
   onSelectAllClick: PropTypes.func,
}
