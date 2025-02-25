/* eslint-disable react/prop-types */
import { DeleteButton } from '../components/buttons/DeleteButton.jsx'
import { EditButton } from '../components/buttons/EditButton.jsx'
import { SeeButton } from '../components/buttons/SeeButton.jsx'
import { MesesDate } from '../utils/utils.js'

const SizeButtons = 'size-8'

export function ConvocatoriaCurso({ curso, convocatorias }) {
   return (
      <section className='border-principal m-2 rounded-xl p-2'>
         <h2 className='text-2xl font-bold'>
            {curso} - {curso + 1}
         </h2>
         <ol>
            {convocatorias.map((fechas) => {
               return <ConvocatoriaItem key={fechas} fechas={fechas} />
            })}
         </ol>
      </section>
   )
}

function ConvocatoriaItem({ fechas }) {
   return (
      <li className='hover-resalt m-1 flex items-center justify-between rounded-lg p-1'>
         <a href=''>
            {fechas[0].getDate()} de {MesesDate[fechas[0].getMonth()]} -{' '}
            {fechas[1].getDate()} de {MesesDate[fechas[1].getMonth()]}
         </a>

         <div className='ml-2 flex items-center gap-2'>
            <a href=''>
               <SeeButton size={SizeButtons} />
            </a>
            <a href=''>
               <EditButton size={SizeButtons} />
            </a>
            <DeleteButton size={SizeButtons} />
         </div>
      </li>
   )
}
