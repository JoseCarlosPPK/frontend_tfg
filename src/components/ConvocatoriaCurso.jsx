/* eslint-disable react/prop-types */
import { Link } from 'react-router'
import {
   DeleteButton,
   EditButton,
   ExcelButton,
   SeeButton,
} from '../components/buttons'
import { endpoints } from '../services/endpoints.js'
import { MesesDate } from '../utils/utils.js'

const SizeButtons = 'size-8'

export function ConvocatoriaCurso({ curso, convocatorias, onClickDelete }) {
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
                     onClickDelete={() => {
                        onClickDelete(convocatoria)
                     }}
                  />
               )
            })}
         </ol>
      </section>
   )
}

function ConvocatoriaItem({ convocatoria, onClickDelete }) {
   return (
      <li className='hover-resalt m-1 flex items-center justify-between rounded-lg p-1'>
         <Link to={`/convocatorias/${convocatoria.id}`}>
            {convocatoria.fecha_ini.getDate()} de{' '}
            {MesesDate[convocatoria.fecha_ini.getMonth()]} -{' '}
            {convocatoria.fecha_fin.getDate()} de{' '}
            {MesesDate[convocatoria.fecha_ini.getMonth()]}
         </Link>

         <div className='ml-2 flex items-center gap-2'>
            <a href={`${endpoints.excel}?id=${convocatoria.id}`}>
               <ExcelButton size={SizeButtons} />
            </a>
            <Link to={`${convocatoria.id}`}>
               <SeeButton size={SizeButtons} />
            </Link>
            <Link to={`edit/${convocatoria.id}`}>
               <EditButton size={SizeButtons} />
            </Link>
            <DeleteButton size={SizeButtons} onClick={onClickDelete} />
         </div>
      </li>
   )
}
