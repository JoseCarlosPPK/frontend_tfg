import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton } from '../components/buttons'
import { ConvocatoriaCurso } from '../components/ConvocatoriaCurso.jsx'
import { routes } from '../router.jsx'
import { request } from '../services/request.js'
import { MesesDate, getCurso, stringFechaToDate } from '../utils/utils.js'

const LimitMonth = MesesDate.Julio

export function ConvocatoriasPage() {
   const [convocatorias, setConvocatorias] = useState(new Map())

   function fetchConvocatorias() {
      request.getConvocatorias().then((res) => {
         if (res.ok) {
            res.json().then((resJson) => {
               const newConvocatorias = new Map()

               resJson.data.forEach((convocatoria) => {
                  convocatoria.fecha_ini = stringFechaToDate(
                     convocatoria.fecha_ini,
                     '-'
                  )
                  convocatoria.fecha_fin = stringFechaToDate(
                     convocatoria.fecha_fin,
                     '-'
                  )
                  let curso = getCurso(convocatoria.fecha_ini, LimitMonth)
                  if (!newConvocatorias.has(curso)) {
                     newConvocatorias.set(curso, [])
                  }

                  newConvocatorias.get(curso).push(convocatoria)
               })

               setConvocatorias(newConvocatorias)
            })
         }
      })
   }

   useEffect(() => {
      fetchConvocatorias()
   }, [])

   return (
      <AppNavFrame>
         <header className='my-2'>
            <Breadcrumb />

            <div className='mt-2 flex items-center gap-2'>
               <h1 className='h1'>Convocatorias</h1>
               <Link to={routes.ConvocatoriasAdd}>
                  <AddButton title='Crear una nueva convocatoria' />
               </Link>
            </div>
         </header>

         {/* Listado de convocatorias por curso */}
         <main className='m-5 max-w-full lg:max-w-fit'>
            {[...convocatorias.keys()].map((curso) => {
               return (
                  <ConvocatoriaCurso
                     key={curso}
                     curso={curso}
                     convocatorias={convocatorias.get(curso)}
                  />
               )
            })}
         </main>
      </AppNavFrame>
   )
}
