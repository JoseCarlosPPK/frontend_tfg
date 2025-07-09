import { Pagination } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { ArrowButton, Button } from '../components/buttons'
import { Input, SearchSelect, Select } from '../components/inputs'
import { Modal } from '../components/Modal.jsx'
import { TIPOS_CENTROS } from '../components/models'
import { PaginationRangeInfo } from '../components/PaginationRangeInfo.jsx'
import { AUTO_HIDE_DURATION } from '../components/snacbarks'
import { Direccion, WarningLogo } from '../components/svg'
import { Table } from '../components/Table.jsx'
import { useAuth, useSelected } from '../hooks'
import { useQueryString } from '../hooks/useQueryString.js'
import { request } from '../services/request.js'

export function CorreoPage() {
   const { signOut } = useAuth()
   const navigate = useNavigate()

   const [numPaso, setNumPaso] = useState(1)
   const pasos = [
      ...TIPOS_CENTROS.map((centro) => {
         return 'Destinatarios ' + centro.name
      }),
      'subject_msg',
   ]

   const { queryString, setQueryString, handleSubmit, handleSelectChange } =
      useQueryString()
   const [indexTipoCentro, setIndexTipoCentro] = useState(0)
   const tipoCentroElegido = TIPOS_CENTROS[indexTipoCentro]
   const [centros, setCentros] = useState([])
   const [totalCentros, setTotalCentros] = useState(0)

   function valueWhenSelected(element) {
      return {
         id: element.id,
         correo: element.correo,
      }
   }

   const selectedStructure = {}

   selectedStructure['Farmacia'] = useSelected(
      TIPOS_CENTROS[0],
      totalCentros,
      queryString,
      valueWhenSelected
   )

   selectedStructure['FarmaciaHospitalaria'] = useSelected(
      TIPOS_CENTROS[1],
      totalCentros,
      queryString,
      valueWhenSelected
   )

   const [openModal, setOpenModal] = useState(false)

   const notifications = useNotifications()

   const buttonActiveClassName =
      'hover-resize text-[var(--color-principal)] h-96'
   const buttonDisabledClassName = 'hidden'

   const isButtonLeftDisabled = numPaso === 1
   const isButtonRightDisabled = numPaso === pasos.length

   const buttonLeftClassName = isButtonLeftDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   const buttonRightClassName = isButtonRightDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   function handleClickRight() {
      const newPaso = numPaso + 1
      setNumPaso(newPaso)
      setIndexTipoCentro(newPaso - 1)
   }

   function handleClickLeft() {
      const newPaso = numPaso - 1
      setNumPaso(newPaso)
      setIndexTipoCentro(newPaso - 1)
   }

   function fetchData() {
      tipoCentroElegido
         .getCentros(
            queryString.page,
            queryString.perPage,
            queryString.search,
            queryString.filter
         )
         .then((res) => {
            if (res.ok) {
               res.json().then((resJson) => {
                  setCentros(resJson.data)
                  setTotalCentros(resJson.total)
               })
            } else {
               setCentros([])
               if (res.status === 401) {
                  signOut()
               }
            }
         })
         .catch(() => {
            // alerta de error
            notifications.show('Fallo de conexión', {
               severity: 'error',
               autoHideDuration: AUTO_HIDE_DURATION,
            })
         })
   }

   function handleConfirm() {
      const correos = [
         ...[...selectedStructure['Farmacia'].selected.values()].map(
            (centro) => {
               return centro.correo
            }
         ),
         ...[
            ...selectedStructure['FarmaciaHospitalaria'].selected.values(),
         ].map((centro) => {
            return centro.correo
         }),
      ]

      const asunto = document.getElementById('asunto').value.trim()
      const mensaje = document.getElementById('msg').value.trim()

      request
         .sendEmail(asunto, mensaje, correos)
         .then((res) => {
            if (res.ok) {
               notifications.show(
                  'Petición enviada correctamente\n. En unos minutos recibirá un informe en su correo',
                  {
                     severity: 'success',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  }
               )

               navigate('/')
            } else {
               if (res.status === 401) {
                  notifications.show(
                     'Sesión caducada, vuelva a iniciar sesión',
                     {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     }
                  )
                  signOut()
               } else {
                  notifications.show('Algo mal ha sucedido', {
                     severity: 'error',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  })
               }
            }
         })
         .catch(() => {
            notifications.show('Fallo de conexión', {
               severity: 'error',
               autoHideDuration: AUTO_HIDE_DURATION,
            })
         })

      setOpenModal(false)
   }

   /**
    * Carga los centros de la API menos cuando el número de paso es el último.
    * Esto se hace para evitar cargar los centros de manera innecesaria
    */
   useEffect(() => {
      if (numPaso != pasos.length) {
         fetchData()
      }
   }, [numPaso, queryString])

   /**
    * Resetea el queryString a la página 1 y búsqueda vacía
    * cuando se cambia de paso, excepto en el primer y último paso.
    */
   useEffect(() => {
      if (numPaso != pasos.length) {
         setQueryString((prev) => ({
            ...prev,
            page: 1,
            search: '',
         }))
      }
   }, [numPaso])

   return (
      <AppNavFrame>
         <header className='my-2 flex justify-between'>
            <div>
               <Breadcrumb />
               <h1 className='h1 mt-2'>Correo</h1>
            </div>
            <div>
               <span className='text-lg font-bold'>
                  jcarloslopez@correo.ugr.es
               </span>
            </div>
         </header>

         <main className='flex items-center'>
            <ArrowButton
               className={buttonLeftClassName}
               disabled={isButtonLeftDisabled}
               onClick={handleClickLeft}
               direccion={Direccion.left}
            />
            <div className='grow'>
               {numPaso != pasos.length && (
                  <>
                     <h2 className='h2'>Selección {tipoCentroElegido.name}</h2>
                     <div className='grow items-center lg:flex'>
                        <aside className='border-principal bg-terciario m-4 grid grow-0 grid-cols-2 gap-2 rounded-md !border-2 p-5'>
                           <label htmlFor='seleccion' className='grow-0'>
                              Seleccionar
                           </label>
                           <Select
                              name='seleccion'
                              id='seleccion'
                              className='ml-4'
                              defaultValue=''
                           >
                              <option value='' disabled={true}>
                                 -- Elija una opción
                              </option>
                              <option value='1/1/2025'>
                                 1/1/2025 - 1/2/2025
                              </option>
                              <option value='2/6/2000'>
                                 2/6/2000 - 1/10/2000
                              </option>
                           </Select>

                           <label htmlFor='mostrar' className='grow-0'>
                              Mostrar
                           </label>
                           <Select name='mostrar' id='mostrar' className='ml-4'>
                              <option value='todos'>Todos</option>
                              <option value='seleccionados'>
                                 Seleccionados
                              </option>
                              <option value='no_seleccionados'>
                                 No seleccionados
                              </option>
                           </Select>
                        </aside>
                        <div className='m-4 grow'>
                           <form
                              className='flex justify-center gap-2'
                              onSubmit={handleSubmit}
                           >
                              <SearchSelect
                                 placeholder='Buscar'
                                 filters={tipoCentroElegido.getFiltros()}
                                 handleSelectChange={handleSelectChange}
                                 value={queryString.search}
                                 onChange={(event) => {
                                    setQueryString((prev) => ({
                                       ...prev,
                                       page: 1,
                                       search: event.target.value,
                                    }))
                                 }}
                              />
                           </form>

                           {/* Contenedor genérico para la tabla y paginación */}
                           <div>
                              {/* Cantidad de elementos a ver */}
                              <div className='mx-16 my-2 flex items-center justify-between'>
                                 <div className='flex items-center gap-2'>
                                    <label htmlFor='amount_centers'>Ver</label>
                                    <Input
                                       id='amount_centers'
                                       type='number'
                                       inputMode='numeric'
                                       name='amount_centers'
                                       list='opt_amount_centers'
                                       min='1'
                                       step='5'
                                       autoComplete='off'
                                       className='w-20'
                                       value={queryString.perPage}
                                       onChange={(event) => {
                                          if (event.target.value > 0) {
                                             setQueryString((prev) => ({
                                                ...prev,
                                                page: 1,
                                                perPage: Number(
                                                   event.target.value
                                                ),
                                             }))
                                          }
                                       }}
                                    />
                                    <datalist id='opt_amount_centers'>
                                       <option value='10'></option>
                                       <option value='20'></option>
                                       <option value='30'></option>
                                    </datalist>
                                 </div>

                                 <PaginationRangeInfo
                                    page={queryString.page}
                                    perPage={queryString.perPage}
                                    total={totalCentros}
                                 />
                              </div>
                              {/* Tabla */}
                              <Table
                                 columns={tipoCentroElegido.getEncabezadosTabla()}
                                 data={centros}
                                 checked={true}
                                 selected={
                                    selectedStructure[tipoCentroElegido.name]
                                       .selected
                                 }
                                 toggleSelected={
                                    selectedStructure[tipoCentroElegido.name]
                                       .toggleSelected
                                 }
                                 total={totalCentros}
                                 onSelectAllClick={
                                    selectedStructure[tipoCentroElegido.name]
                                       .handleClickGeneralCheckbox
                                 }
                              />

                              {/* Pagination */}
                              <Pagination
                                 color='secondary'
                                 count={Math.ceil(
                                    totalCentros / queryString.perPage
                                 )}
                                 boundaryCount={2}
                                 page={queryString.page}
                                 size='large'
                                 sx={{
                                    '& .MuiPaginationItem-root:hover': {
                                       backgroundColor: 'terciary.main',
                                       zIndex: 9999,
                                    },
                                 }}
                                 className='m-2 justify-self-center'
                                 onChange={(_, page) => {
                                    setQueryString((previousState) => ({
                                       ...previousState,
                                       page: page,
                                    }))
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  </>
               )}

               {numPaso === pasos.length && (
                  <>
                     <div className='m-5 w-5/6 justify-self-center'>
                        <h2 className='h2 my-2'>Asunto y mensaje</h2>
                        <div className='my-2'>
                           <label htmlFor='asunto' className='text-lg'>
                              Asunto
                           </label>
                           <Input
                              type='text'
                              name='asunto'
                              id='asunto'
                              className='bg-terciario border-principal w-full'
                           />
                        </div>

                        <div className='my-2'>
                           <label htmlFor='msg' className='text-lg'>
                              Mensaje
                           </label>
                           <textarea
                              name='msg'
                              id='msg'
                              className='bg-terciario myoutline border-principal h-60 w-full rounded-lg p-1'
                           />
                        </div>

                        <div className='flex justify-end'>
                           <Button
                              color='bg-secundario hover:bg-purple-800'
                              size='p-2'
                              onClick={() => setOpenModal(true)}
                           >
                              Enviar
                           </Button>
                        </div>
                     </div>

                     <Modal
                        open={openModal}
                        onClose={() => {
                           setOpenModal(false)
                        }}
                        onConfirm={handleConfirm}
                        title='Enviar correo'
                        dialogProps={{
                           fullWidth: true,
                        }}
                     >
                        <div className='ml-5'>
                           <h3 className='h3'>Destinatarios</h3>
                           <ul className='mb-3 list-disc pl-5'>
                              <li>
                                 Farmacias:{' '}
                                 <span className='text-lg'>
                                    {
                                       selectedStructure['Farmacia'].selected
                                          .size
                                    }
                                 </span>
                              </li>
                              <li>
                                 Farmacias Hospitalarias:{' '}
                                 <span className='text-lg'>
                                    {
                                       selectedStructure['FarmaciaHospitalaria']
                                          .selected.size
                                    }
                                 </span>
                              </li>
                           </ul>

                           {document.getElementById('asunto')?.value.trim() ==
                              '' && (
                              <p>
                                 <WarningLogo className='mr-2' />
                                 <strong className='font-semibold'>
                                    Sin asunto
                                 </strong>
                              </p>
                           )}

                           {document.getElementById('msg')?.value.trim() ==
                              '' && (
                              <p>
                                 <WarningLogo className='mr-2' />
                                 <strong className='font-semibold'>
                                    Sin cuerpo de mensaje
                                 </strong>
                              </p>
                           )}
                        </div>
                     </Modal>
                  </>
               )}
            </div>
            <ArrowButton
               className={buttonRightClassName}
               disabled={isButtonRightDisabled}
               onClick={handleClickRight}
               direccion={Direccion.right}
            />
         </main>
      </AppNavFrame>
   )
}
