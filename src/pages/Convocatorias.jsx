import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton } from '../components/buttons/AddButton.jsx'
import { ConvocatoriaCurso } from '../components/ConvocatoriaCurso.jsx'
import convocatorias_data from '../data/convocatorias.json'
import { MesesDate, getCurso, stringFechaToDate } from '../utils/utils.js'

const LimitMonth = MesesDate.Julio

export function ConvocatoriasPage() {
   let convocatorias = new Map()

   convocatorias_data['data'].forEach((c) => {
      let fechasString = c.split('-')
      let fechaIni = stringFechaToDate(fechasString[0])
      let fechaFin = stringFechaToDate(fechasString[1])

      let curso = getCurso(fechaIni, LimitMonth)
      if (!convocatorias.has(curso)) {
         convocatorias.set(curso, [])
      }

      convocatorias.get(curso).push([fechaIni, fechaFin])
   })

   return (
      <AppNavFrame>
         <div className='m-3 grow'>
            <header className='my-2'>
               <Breadcrumb />

               <div className='mt-2 flex items-center gap-2'>
                  <h1 className='h1'>Convocatorias</h1>
                  <a href=''>
                     <AddButton title='Crear una nueva convocatoria' />
                  </a>
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
         </div>
      </AppNavFrame>
   )
}
