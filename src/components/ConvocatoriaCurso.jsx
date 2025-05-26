/* eslint-disable react/prop-types */
import { DeleteButton, EditButton, SeeButton } from '../components/buttons'
import { Routes } from '../routes.js'
import { MesesDate } from '../utils/utils.js'

const SizeButtons = 'size-8'

export function ConvocatoriaCurso({ curso, convocatorias }) {
   return (
      <section className='border-principal m-2 rounded-xl p-2'>
         <h2 className='text-2xl font-bold'>
            {curso} - {curso + 1}
         </h2>
         <ol>
            {convocatorias.map((convocatoria) => {
               return (
                  <ConvocatoriaItem
                     key={convocatoria.id}
                     convocatoria={convocatoria}
                  />
               )
            })}
         </ol>
      </section>
   )
}

function ConvocatoriaItem({ convocatoria }) {
   return (
      <li className='hover-resalt m-1 flex items-center justify-between rounded-lg p-1'>
         <a href=''>
            {convocatoria.fecha_ini.getDate()} de{' '}
            {MesesDate[convocatoria.fecha_ini.getMonth()]} -{' '}
            {convocatoria.fecha_fin.getDate()} de{' '}
            {MesesDate[convocatoria.fecha_ini.getMonth()]}
         </a>

         <div className='ml-2 flex items-center gap-2'>
            <a href={`${Routes.ConvocatoriasSee}/${convocatoria.id}`}>
               <SeeButton size={SizeButtons} />
            </a>
            <a href={Routes.ConvocatoriasEdit}>
               <EditButton size={SizeButtons} />
            </a>
            <DeleteButton size={SizeButtons} />
         </div>
      </li>
   )
}
