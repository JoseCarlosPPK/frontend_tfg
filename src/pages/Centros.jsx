import { Pagination } from '@mui/material'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton, DeleteButton, EditButton } from '../components/buttons'
import { Input, Select } from '../components/inputs'
import { FarmaciasColumnas } from '../components/models/columns.jsx'
import { Table } from '../components/Table.jsx'
import farmacias from '../data/farmacias.json'

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
               <form className='flex justify-center gap-2'>
                  <Input
                     type='text'
                     name='buscador'
                     className='p-2.5'
                     placeholder='Buscar ...'
                  />
                  <Select name='filtros'>
                     <option value='nombre'>Nombre del centro</option>
                     <option value='responsable'>Tutor</option>
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
                        min='10'
                        step='10'
                        autoComplete='off'
                        className='w-20'
                     />
                     <datalist id='opt_amount_centers'>
                        <option value='10'></option>
                        <option value='20'></option>
                        <option value='30'></option>
                     </datalist>
                  </div>

                  <span>10 de 1000</span>
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
               <Table columns={FarmaciasColumnasEdited} data={farmacias.data} />

               {/* Pagination */}
               <Pagination
                  color='secondary'
                  count={10}
                  boundaryCount={2}
                  size='large'
                  sx={{
                     '& .MuiPaginationItem-root:hover': {
                        backgroundColor: 'terciary.main',
                        zIndex: 9999,
                     },
                  }}
                  className='m-2 justify-self-center'
               />
            </div>
         </main>
      </AppNavFrame>
   )
}
