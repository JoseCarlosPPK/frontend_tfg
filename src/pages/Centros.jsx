import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton, DeleteButton, EditButton } from '../components/buttons'
import { Input, Select } from '../components/inputs'
import { FarmaciasColumnas } from '../components/models/columns.jsx'
import { Table } from '../components/Table.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { request } from '../services'

const FarmaciasColumnasEdited = [
   ...FarmaciasColumnas,
   {
      name: 'Acción',
      createCell: (row) => {
         return (
            <td key={row.id}>
               <div className='flex items-center justify-center gap-2'>
                  <EditButton />
                  <DeleteButton />
               </div>
            </td>
         )
      },
   },
]

export function CentrosPage() {
   const { signOut } = useAuth()
   const [farmacias, setFarmacias] = useState([])
   const [queryString, setQueryString] = useState({
      page: 1,
      perPage: 10,
      search: '',
      filter: '',
   })
   const [totalCentros, setTotalCentros] = useState(0)

   useEffect(() => {
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
            }
         })
         .catch(() => {
            signOut()
         })
   }, [queryString])

   function handleSubmit(event) {
      event.preventDefault()

      const form = new FormData(event.target)

      setQueryString((prev) => ({
         ...prev,
         page: 1,
         search: form.get('search'),
         filter: form.get('filter'),
      }))
   }

   return (
      <AppNavFrame>
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
                  id='searchForm'
               >
                  <Input
                     type='search'
                     name='search'
                     className='p-2.5'
                     placeholder='Buscar ...'
                  />
                  <Select name='filter'>
                     <option value='nombre'>Nombre del centro</option>
                     <option value='personas'>Tutor</option>
                     <option value='localidad'>Localidad</option>
                     <option value='provincia'>Provincia</option>
                     <option value='cp'>Código Postal</option>
                     <option value='correo'>Correo electrónico</option>
                     <option value='telefono'>Teléfono</option>
                     <option value='movil'>Móvil</option>
                  </Select>
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
