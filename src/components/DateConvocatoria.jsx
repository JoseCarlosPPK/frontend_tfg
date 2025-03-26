/* eslint-disable react/prop-types */

import { Input } from './inputs/Input.jsx'

export function DateConvocatoria({
   fecha_ini,
   fecha_fin,
   disabled,
   onChangeFechaIni,
   onChangeFechaFin,
}) {
   const inputClassName = disabled
      ? 'bg-zinc-300 ml-2 border border-solid border-gray-700 p-1'
      : 'ml-2 p-1'

   return (
      <div className='border-principal rounded-xl p-6 pb-8'>
         <h2 className='h2'>Fechas</h2>

         <section className='mt-4 grid grid-cols-2 items-center gap-5'>
            <label htmlFor='fecha_ini'>Fecha inicial:</label>
            <Input
               type='date'
               name='fecha_ini'
               id='fecha_ini'
               value={fecha_ini}
               className={inputClassName}
               disabled={disabled}
               onChange={onChangeFechaIni}
            />

            <label htmlFor='fecha_fin'>Fecha final:</label>
            <Input
               type='date'
               name='fecha_fin'
               id='fecha_fin'
               value={fecha_fin}
               className={inputClassName}
               disabled={disabled}
               onChange={onChangeFechaFin}
            />
         </section>
      </div>
   )
}
