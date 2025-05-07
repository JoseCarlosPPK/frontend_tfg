import { Pagination, Slide } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { forwardRef, useEffect, useState } from 'react'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import {
   AddButton,
   ArrowButton,
   Button,
   DeleteButton,
   EditButton,
} from '../components/buttons'
import { Input, Search, SearchSelect } from '../components/inputs'
import { Modal } from '../components/Modal.jsx'
import { FarmaciasColumnas } from '../components/models/columns.jsx'
import { filters } from '../components/models/filters.js'
import { AUTO_HIDE_DURATION } from '../components/snacbarks'
import { Direccion } from '../components/svg/arrow_direction.js'
import { Table } from '../components/Table.jsx'
import { useAuth, useQueryString } from '../hooks'
import { request } from '../services'

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />
})

export function CentrosPage() {
   const { signOut } = useAuth()
   const [farmacias, setFarmacias] = useState([])
   const { queryString, setQueryString, handleSubmit, handleSelectChange } =
      useQueryString()
   const [totalCentros, setTotalCentros] = useState(0)
   const [centroElegido, setCentroElegido] = useState({ nombre: '', id: '' })
   const [open, setOpen] = useState(false)
   const [openAdd, setOpenAdd] = useState(false)
   const [tutores, setTutores] = useState([])
   const notifications = useNotifications()
   const [tutoresBuscados, setTutoresBuscados] = useState([])
   const [pageTutores, setPageTutores] = useState(1)
   const [totalTutores, setTotalTutores] = useState(0)
   const [searchTutores, setSearchTutores] = useState('')
   const perPageTutores = 10

   const FarmaciasColumnasEdited = [
      ...FarmaciasColumnas,
      {
         name: 'Acción',
         createCell: (row, index) => {
            return (
               <td key={row.id}>
                  <div className='flex items-center justify-center gap-2'>
                     <EditButton />
                     <DeleteButton
                        onClick={() => {
                           setCentroElegido(farmacias[index])
                           setOpen(true)
                        }}
                     />
                  </div>
               </td>
            )
         },
      },
   ]

   /**
    * Añade un nuevo input para añadir un tutor/a
    */
   function handleAddTutor(persona = {}) {
      setTutores((prev) => [
         ...prev,
         Object.assign(persona, { idTmp: crypto.randomUUID() }),
      ])
   }

   function existeTutor(buscado) {
      return tutores.some((tutor) => tutor.id === buscado.id)
   }

   function fetchTutores(name, page, perPage) {
      request
         .getPersonas(name, page, perPage)
         .then((res) => {
            if (res.ok) {
               res.json().then((resJson) => {
                  setTutoresBuscados(resJson.data)
                  setTotalTutores(resJson.total)
               })
            } else {
               if (res.status === 401) {
                  signOut()
               } else {
                  notifications.show('Algo falló', {
                     severity: 'error',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  })
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

   function fetchData() {
      request
         .farmacias(
            queryString.page,
            queryString.perPage,
            queryString.search,
            queryString.filter
         )
         .then((res) => {
            if (res.ok) {
               res.json().then((resJson) => {
                  setFarmacias(resJson.data)
                  setTotalCentros(resJson.total)
               })
            } else {
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

   useEffect(() => {
      fetchData()
   }, [queryString])

   return (
      <AppNavFrame>
         {/* Modal DELETE */}
         <Modal
            open={open}
            onClose={() => setOpen(false)}
            confirmText='Borrar'
            title={`Borrar ${centroElegido.nombre}`}
            confirmColorClassName='red'
            onConfirm={() => {
               // Mostrar alert del resultado
               request
                  .deleteFarmacia(centroElegido.id)
                  .then((res) => {
                     setOpen(false)

                     if (res.ok) {
                        if (
                           queryString.perPage == 1 &&
                           totalCentros - 1 < queryString.page &&
                           queryString.page > 1
                        ) {
                           setQueryString((prev) => ({
                              ...prev,
                              page: prev.page - 1,
                           }))
                        } else {
                           fetchData()
                        }

                        // alerta de éxito
                        notifications.show(
                           `El centro ${centroElegido.nombre} ha sido borrado`,

                           {
                              severity: 'success',
                              autoHideDuration: AUTO_HIDE_DURATION,
                           }
                        )
                     } else {
                        if (res.status === 401) {
                           signOut()
                        }
                        // alerta de error
                        notifications.show(
                           `El centro ${centroElegido.nombre} NO ha sido borrado`,
                           {
                              severity: 'error',
                              autoHideDuration: AUTO_HIDE_DURATION,
                           }
                        )
                     }
                  })
                  .catch(() => {
                     // alerta de error
                     notifications.show('Fallo de conexión', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  })
            }}
         >
            <p>
               ¿Está seguro de que quiere borrar el centro{' '}
               {centroElegido.nombre}? Una vez hecho, no habrá vuelta atrás.
            </p>
         </Modal>

         {/* Modal ADD */}
         <Modal
            open={openAdd}
            onClose={() => {
               setOpenAdd(false)
            }}
            onConfirm={(event) => {
               event.preventDefault()
               const tutoresFormateados = tutores.map((value) => {
                  if (value.id) {
                     return {
                        id: value.id,
                        nombre: value.nombre,
                     }
                  } else {
                     return {
                        nombre: value.nombre,
                     }
                  }
               })

               const formData = new FormData(event.target)
               const centroACrear = {
                  personas: tutoresFormateados,
                  nombre: formData.get('nombre'),
                  direccion: formData.get('direccion'),
                  localidad: formData.get('localidad'),
                  provincia: formData.get('provincia'),
                  cp: formData.get('cp'),
                  correo: formData.get('correo'),
                  telefono: formData.get('telefono'),
                  movil: formData.get('movil'),
               }

               request
                  .addFarmacia(centroACrear)
                  .then((res) => {
                     if (res.ok) {
                        // limpieza de estados
                        setOpenAdd(false)
                        setTutores([])
                        setTutoresBuscados([])
                        setPageTutores(1)
                        setSearchTutores('')

                        // alerta de éxito
                        notifications.show(
                           `El centro ${centroACrear.nombre} ha sido creado`,
                           {
                              severity: 'success',
                              autoHideDuration: AUTO_HIDE_DURATION,
                           }
                        )
                     } else {
                        if (res.status === 401) {
                           signOut()
                        }
                        // alerta de error
                        notifications.show(
                           `El centro ${centroACrear.nombre} NO ha sido creado`,
                           {
                              severity: 'error',
                              autoHideDuration: AUTO_HIDE_DURATION,
                           }
                        )
                     }
                  })
                  .catch(() => {
                     // alerta de error
                     notifications.show('Fallo de conexión', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  })
            }}
            title='Añadir un nuevo centro'
            form={true}
            dialogProps={{
               fullWidth: true,
               scroll: 'body',
               fullScreen: true,
               slots: {
                  transition: Transition,
               },
            }}
         >
            <div className='divide-y-2 lg:grid lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0'>
               <div className='p-2'>
                  <h2 className='h2'>Tutores</h2>
                  <div className='my-3'>
                     <label
                        htmlFor='tutorBuscado'
                        className='mb-2 text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Buscar al tutor/a
                     </label>
                     <Search
                        value={searchTutores}
                        onChange={(event) => {
                           const newValue = event.target.value
                           setSearchTutores(newValue)
                           setPageTutores(1)

                           if (newValue === '') {
                              setTutoresBuscados([])
                           }
                        }}
                        name='tutorBuscado'
                        id='tutorBuscado'
                        placeholder='Tutor/a'
                        className='w-full'
                        onKeyDown={(event) => {
                           if (event.key === 'Enter') {
                              event.preventDefault()
                              fetchTutores(
                                 searchTutores,
                                 pageTutores,
                                 perPageTutores
                              )
                           }
                        }}
                        onClick={() => {
                           fetchTutores(
                              searchTutores,
                              pageTutores,
                              perPageTutores
                           )
                        }}
                     />

                     {tutoresBuscados.length > 0 && (
                        <div className='divide-y divide-gray-400 rounded-lg border border-gray-400'>
                           {tutoresBuscados.map((value) => {
                              return (
                                 <p
                                    className='hover-resalt flex items-center justify-between rounded-lg p-1 hover:cursor-pointer'
                                    key={value.id}
                                    onClick={() => {
                                       if (!existeTutor(value)) {
                                          handleAddTutor(value)
                                       }
                                    }}
                                 >
                                    {value.nombre}
                                    {existeTutor(value) && (
                                       <span className='rounded-lg bg-green-700 p-1 text-white'>
                                          seleccionado
                                       </span>
                                    )}
                                 </p>
                              )
                           })}
                           <div className='mx-2 flex items-center justify-between'>
                              <ArrowButton
                                 type='button'
                                 size='size-8'
                                 direccion={Direccion.left}
                                 disabled={pageTutores === 1}
                                 className={
                                    pageTutores === 1 ? 'text-gray-600' : ''
                                 }
                                 onClick={() => {
                                    const newPage = pageTutores - 1
                                    setPageTutores(newPage)
                                    fetchTutores(
                                       searchTutores,
                                       newPage,
                                       perPageTutores
                                    )
                                 }}
                              />
                              <ArrowButton
                                 type='button'
                                 size='size-8'
                                 direccion={Direccion.right}
                                 disabled={
                                    pageTutores * perPageTutores >= totalTutores
                                 }
                                 className={
                                    pageTutores * perPageTutores >= totalTutores
                                       ? 'text-gray-600'
                                       : ''
                                 }
                                 onClick={() => {
                                    const newPage = pageTutores + 1
                                    setPageTutores(newPage)
                                    fetchTutores(
                                       searchTutores,
                                       newPage,
                                       perPageTutores
                                    )
                                 }}
                              />
                           </div>
                        </div>
                     )}
                  </div>

                  <header className='flex justify-between'>
                     <h3 className='h3'>Listado de tutores/as</h3>
                     <span>{tutores.length} tutores/as añadidos</span>
                  </header>
                  <div>
                     <ul>
                        {tutores.map((value, index) => {
                           return (
                              <li
                                 key={value.idTmp}
                                 className='my-2 flex items-center gap-3'
                              >
                                 <Input
                                    value={value.nombre ?? ''}
                                    className='w-full p-1'
                                    placeholder='Nombre y apellidos'
                                    name={`tutor_${index}`}
                                    required
                                    autoFocus={index === tutores.length - 1}
                                    onChange={(event) => {
                                       const newTutores = [...tutores]
                                       newTutores[index] = {
                                          ...newTutores[index],
                                          nombre: event.target.value,
                                       }
                                       setTutores(newTutores)
                                    }}
                                 />
                                 <DeleteButton
                                    type='button'
                                    size='size-7'
                                    onClick={() => {
                                       const newTutores = tutores.toSpliced(
                                          index,
                                          1
                                       )

                                       setTutores(newTutores)
                                    }}
                                 ></DeleteButton>
                              </li>
                           )
                        })}
                     </ul>
                     <div className='flex justify-center'>
                        <Button
                           color='bg-green-600 hover:bg-green-700 text-white'
                           size='p-2'
                           type='button'
                           onClick={handleAddTutor}
                        >
                           Añadir
                        </Button>
                     </div>
                  </div>
               </div>
               <div className='p-2'>
                  <h3 className='h3'>Datos del centro</h3>

                  <div className='my-3'>
                     <label
                        htmlFor='nombre'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Nombre
                     </label>
                     <Input
                        type='text'
                        name='nombre'
                        id='nombre'
                        className='w-full p-2'
                        placeholder='Farmacia San Rafael'
                        required
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='direccion'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Dirección
                     </label>
                     <Input
                        type='text'
                        name='direccion'
                        id='direccion'
                        className='w-full p-2'
                        placeholder='C/ ... '
                        required
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='localidad'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Localidad
                     </label>
                     <Input
                        type='text'
                        name='localidad'
                        id='localidad'
                        className='w-full p-2'
                        placeholder='Localidad'
                        required
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='provincia'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Provincia
                     </label>
                     <Input
                        type='text'
                        name='provincia'
                        id='provincia'
                        className='w-full p-2'
                        placeholder='Provincia'
                        required
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='cp'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Código Postal
                     </label>
                     <Input
                        type='number'
                        name='cp'
                        id='cp'
                        className='w-full p-2'
                        placeholder='Código Postal'
                        required
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='correo'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Correo electrónico
                     </label>
                     <Input
                        type='email'
                        name='correo'
                        id='correo'
                        className='w-full p-2'
                        placeholder='ejemplo@gmail.com'
                        required
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='telefono'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Teléfono
                     </label>
                     <Input
                        type='tel'
                        name='telefono'
                        id='telefono'
                        className='w-full p-2'
                        placeholder='XXX XX XX XX'
                     />
                  </div>

                  <div className='my-3'>
                     <label
                        htmlFor='movil'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                     >
                        Móvil
                     </label>
                     <Input
                        type='tel'
                        name='movil'
                        id='movil'
                        className='w-full p-2'
                        placeholder='XXX XX XX XX'
                     />
                  </div>
               </div>
            </div>
         </Modal>

         <header className='my-2'>
            <Breadcrumb />

            <div className='mt-2 flex items-center gap-2'>
               <h1 className='h1'>Centros</h1>
               <AddButton
                  title='Añadir un nuevo centro'
                  onClick={() => setOpenAdd(true)}
               />
            </div>
         </header>

         <main className='w-full justify-self-center 2xl:w-[80%]'>
            {/* Search input and filters */}
            <div>
               <form
                  className='flex justify-center gap-2'
                  onSubmit={handleSubmit}
               >
                  <SearchSelect
                     placeholder='Buscar'
                     filters={filters}
                     handleSelectChange={handleSelectChange}
                  />
               </form>
            </div>
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
                        defaultValue='10'
                        min='1'
                        step='5'
                        autoComplete='off'
                        className='w-20'
                        onChange={(event) => {
                           if (event.target.value > 0) {
                              setQueryString((prev) => ({
                                 ...prev,
                                 page: 1,
                                 perPage: event.target.value,
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

                  <span>
                     {queryString.page * queryString.perPage -
                        queryString.perPage +
                        1}
                     -{queryString.page * queryString.perPage} de {totalCentros}
                  </span>
               </div>
               {/* <TablePagination
                     rowsPerPageOptions={[5, 10, 25]}
                     component='div'
                     count={1000}
                     rowsPerPage={10}
                     page={0}
                     onPageChange={null}
                     onRowsPerPageChange={null}
                     labelRowsPerPage='Filas por página'
                     className='mx-16 my-2 flex items-center justify-center gap-2'
                  /> */}
               {/* Tabla */}
               <Table columns={FarmaciasColumnasEdited} data={farmacias} />

               {/* Pagination */}
               <Pagination
                  color='secondary'
                  count={Math.ceil(totalCentros / queryString.perPage)}
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
         </main>
      </AppNavFrame>
   )
}
