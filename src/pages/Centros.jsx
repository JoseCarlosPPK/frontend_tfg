import { Pagination } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { useEffect, useState } from 'react'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton, DeleteButton, EditButton } from '../components/buttons'
import { Input, SearchSelect } from '../components/inputs'
import { Modal } from '../components/Modal.jsx'
import { FarmaciasColumnas } from '../components/models/columns.jsx'
import { filters } from '../components/models/filters.js'
import { AUTO_HIDE_DURATION } from '../components/snacbarks'
import { Table } from '../components/Table.jsx'
import { useAuth, useQueryString } from '../hooks'
import { request } from '../services'

export function CentrosPage() {
   const { signOut } = useAuth()
   const [farmacias, setFarmacias] = useState([])
   const { queryString, setQueryString, handleSubmit, handleSelectChange } =
      useQueryString()
   const [totalCentros, setTotalCentros] = useState(0)
   const [centroElegido, setCentroElegido] = useState({ nombre: '', id: '' })
   const [open, setOpen] = useState(false)
   const notifications = useNotifications()

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
               signOut()
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

         <header className='my-2'>
            <Breadcrumb />

            <div className='mt-2 flex items-center gap-2'>
               <h1 className='h1'>Centros</h1>
               <AddButton title='Añadir un nuevo centro' />
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
