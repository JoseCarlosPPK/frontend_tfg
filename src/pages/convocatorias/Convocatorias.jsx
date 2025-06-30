import { useNotifications } from '@toolpad/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AppNavFrame } from '../../components/AppFrame.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { AddButton } from '../../components/buttons/index.js'
import { ConvocatoriaCurso } from '../../components/ConvocatoriaCurso.jsx'
import { AUTO_HIDE_DURATION } from '../../components/snacbarks'
import { routes } from '../../router.jsx'
import { request } from '../../services/request.js'
import { MesesDate, getCurso, stringFechaToDate } from '../../utils/utils.js'
import { ModalDelete } from './ModalDelete.jsx'

const LimitMonth = MesesDate.Julio

export function ConvocatoriasPage() {
   const [convocatorias, setConvocatorias] = useState(new Map())

   const [openDeleteModal, setOpenDeleteModal] = useState(false)
   const [convocatoriaToDelete, setConvocatoriaToDelete] = useState({
      fecha_ini: new Date(),
      fecha_fin: new Date(),
   })

   const notifications = useNotifications()

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
         <ModalDelete
            open={openDeleteModal}
            convocatoria={convocatoriaToDelete}
            onClose={() => {
               setOpenDeleteModal(false)
            }}
            onConfirm={() => {
               request
                  .deleteConvocatoria(convocatoriaToDelete.id)
                  .then((res) => {
                     if (res.ok) {
                        setOpenDeleteModal(false)
                        fetchConvocatorias()
                        notifications.show('Convocatoria borrada', {
                           severity: 'success',
                           autoHideDuration: AUTO_HIDE_DURATION,
                        })
                     } else {
                        notifications.show('Error al borrar la convocatoria', {
                           severity: 'error',
                           autoHideDuration: AUTO_HIDE_DURATION,
                        })
                     }
                  })
                  .catch(() => {
                     notifications.show('Error de conexión', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  })
            }}
         />
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
                     onClickDelete={(convocatoria) => {
                        setConvocatoriaToDelete(convocatoria)
                        setOpenDeleteModal(true)
                     }}
                  />
               )
            })}
         </main>
      </AppNavFrame>
   )
}
