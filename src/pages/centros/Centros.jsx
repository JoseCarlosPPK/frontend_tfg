import { Pagination } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { useEffect, useState } from 'react'
import { AppNavFrame } from '../../components/AppFrame.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import {
   AddButton,
   Button,
   DeleteButton,
   EditButton,
} from '../../components/buttons/index.js'
import { Input, SearchSelect } from '../../components/inputs/index.js'
import { TIPOS_CENTROS } from '../../components/models'
import { AUTO_HIDE_DURATION } from '../../components/snacbarks/index.js'
import { Table } from '../../components/Table.jsx'
import { useAuth, useQueryString } from '../../hooks/index.js'
import { ModalAddEdit } from './ModalAddEdit.jsx'
import { ModalDelete } from './ModalDelete.jsx'

export function CentrosPage() {
   const { signOut } = useAuth()
   const [indexTipoCentro, setIndexTipoCentro] = useState(1)
   const tipoCentroElegido = TIPOS_CENTROS[indexTipoCentro]
   const [farmacias, setFarmacias] = useState([])
   const { queryString, setQueryString, handleSubmit, handleSelectChange } =
      useQueryString()
   const [totalCentros, setTotalCentros] = useState(0)
   const [centroElegido, setCentroElegido] = useState(
      tipoCentroElegido.getCentroVacio()
   )
   const [openDeleteModal, setOpenDeleteModal] = useState(false)
   const [openAddModal, setOpenAddModal] = useState(false)
   const [editMode, setEditMode] = useState(false)
   const [errorCentro, setErrorCentro] = useState({
      nombre: false,
      direccion: false,
      localidad: false,
      provincia: false,
      cp: false,
      correo: false,
      telefono: false,
      movil: false,
      personas: false,
      generico: false,
   })
   const notifications = useNotifications()

   const FarmaciasColumnasEdited = [
      ...tipoCentroElegido.getEncabezadosTabla(),
      {
         name: 'Acción',
         createCell: (row, index) => {
            return (
               <td key={row.id}>
                  <div className='flex items-center justify-center gap-2'>
                     <EditButton
                        onClick={() => {
                           setCentroElegido(farmacias[index])
                           setEditMode(true)
                           setOpenAddModal(true)
                        }}
                     />
                     <DeleteButton
                        onClick={() => {
                           setCentroElegido(farmacias[index])
                           setOpenDeleteModal(true)
                        }}
                     />
                  </div>
               </td>
            )
         },
      },
   ]

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
                  setFarmacias(resJson.data)
                  setTotalCentros(resJson.total)
               })
            } else {
               setFarmacias([])
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
   }, [queryString, tipoCentroElegido])

   function deleteCentro() {
      tipoCentroElegido
         .deleteCentro(centroElegido.id)
         .then((res) => {
            setOpenDeleteModal(false)

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
   }

   function editCentro(event) {
      event.preventDefault()
      // Damos el formato correcto para la API
      const tutoresFormateados = centroElegido.personas.map((value) => {
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

      const centroToEdit = {
         ...centroElegido,
         personas: tutoresFormateados,
      }

      tipoCentroElegido
         .editCentro(centroToEdit)
         .then((res) => {
            if (res.ok) {
               setOpenAddModal(false)
               fetchData()

               // alerta de éxito
               notifications.show(
                  `El centro ${centroToEdit.nombre} ha sido editado`,
                  {
                     severity: 'success',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  }
               )
            } else {
               if (res.status === 401) {
                  signOut()
               } else {
                  res.json().then((resJson) => {
                     const newErrorCentro = {}

                     for (const key of Object.keys(errorCentro)) {
                        newErrorCentro[key] = resJson[key] ?? false
                     }

                     if (resJson.error) {
                        newErrorCentro.generico = resJson.error ?? false
                     }
                     setErrorCentro(newErrorCentro)
                  })
               }
               // alerta de error
               notifications.show(
                  `El centro ${centroToEdit.nombre} NO ha sido editado`,
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
   }

   function addCentro(event) {
      event.preventDefault() // en un evento onSubmit se recarga la pág. y no queremos eso

      // Damos el formato correcto para la API
      const tutoresFormateados = centroElegido.personas.map((value) => {
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

      const centroToAdd = {
         ...centroElegido,
         personas: tutoresFormateados,
      }

      tipoCentroElegido
         .addCentro(centroToAdd)
         .then((res) => {
            if (res.ok) {
               setOpenAddModal(false)

               fetchData()

               // alerta de éxito
               notifications.show(
                  `El centro ${centroToAdd.nombre} ha sido creado`,
                  {
                     severity: 'success',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  }
               )
            } else {
               if (res.status === 401) {
                  signOut()
               } else {
                  res.json().then((resJson) => {
                     const newErrorCentro = {}

                     for (const key of Object.keys(errorCentro)) {
                        newErrorCentro[key] = resJson[key] ?? false
                     }

                     if (resJson.error) {
                        newErrorCentro.generico = resJson.error ?? false
                     }
                     setErrorCentro(newErrorCentro)
                  })
               }
               // alerta de error
               notifications.show(
                  `El centro ${centroToAdd.nombre} NO ha sido creado`,
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
   }

   return (
      <AppNavFrame>
         {/* Modal DELETE */}
         <ModalDelete
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={deleteCentro}
            centro={centroElegido}
         />

         {/* Modal ADD */}
         <ModalAddEdit
            open={openAddModal}
            onClose={() => {
               setOpenAddModal(false)
            }}
            onConfirm={editMode ? editCentro : addCentro}
            centro={centroElegido}
            setCentro={setCentroElegido}
            error={errorCentro}
            edit={editMode}
         />

         <header className='my-2'>
            <Breadcrumb />

            <div className='mt-2 flex items-center gap-2'>
               <h1 className='h1'>Centros</h1>
               <AddButton
                  title='Añadir un nuevo centro'
                  onClick={() => {
                     setOpenAddModal(true)
                     setEditMode(false)
                     setCentroElegido(tipoCentroElegido.getCentroVacio())
                  }}
               />
            </div>
         </header>

         <main className='w-full justify-self-center 2xl:w-[80%]'>
            <div className='flex w-full border-b-2'>
               {TIPOS_CENTROS.map((centro, index) => {
                  return (
                     <Button
                        key={index}
                        color={`${index === indexTipoCentro ? 'bg-principal' : 'bg-terciario'} hover:bg-[var(--color-secundario)] hover:text-white`}
                        size='p-2'
                        value={centro.name}
                        onClick={() => {
                           setIndexTipoCentro(index)
                           setQueryString((prev) => ({
                              ...prev,
                              page: 1,
                           }))
                        }}
                     >
                        {centro.name}
                     </Button>
                  )
               })}
            </div>
            {/* Search input and filters */}
            <div className='p-2'>
               <form
                  className='flex justify-center gap-2'
                  onSubmit={handleSubmit}
               >
                  <SearchSelect
                     placeholder='Buscar'
                     filters={tipoCentroElegido.getFiltros()}
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
