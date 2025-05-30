import { Pagination } from '@mui/material'
import { AppNavFrame } from '../../components/AppFrame.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import {
   AddButton,
   BUTTONS_APPEARANCE,
   DeleteButton,
   EditButton,
   MailButton,
} from '../../components/buttons'
import { Input, Search } from '../../components/inputs'
import { PaginationRangeInfo } from '../../components/PaginationRangeInfo.jsx'
import { Table } from '../../components/Table.jsx'
import usuarios from '../../data/usuarios.json'

const Columns = [
   {
      name: 'Usuario',
      createCell: (row) => {
         return (
            <td key={row.nombre} className='text-center'>
               <p>{row.nombre}</p>
               <p className='text-sm'>{row.correo}</p>
            </td>
         )
      },
   },
   {
      name: 'Permisos',
      createCell: (row) => {
         return (
            <td
               key={row.permisos}
               className='flex items-center justify-center gap-5'
            >
               {Object.entries(row.permisos).map(([key, value]) => {
                  return (
                     <div key={key}>
                        <h3 className='text-center'>{key}</h3>
                        <div className='flex items-center justify-center gap-1'>
                           {key === 'correo' ? (
                              <MailButton
                                 appearance={
                                    value
                                       ? BUTTONS_APPEARANCE.ACTIVATE
                                       : BUTTONS_APPEARANCE.DEACTIVATE
                                 }
                                 disabled={true}
                                 size='size-8'
                              />
                           ) : (
                              <>
                                 <AddButton
                                    appearance={
                                       value.add
                                          ? BUTTONS_APPEARANCE.ACTIVATE
                                          : BUTTONS_APPEARANCE.DEACTIVATE
                                    }
                                    disabled={true}
                                    size='size-8'
                                 />
                                 <EditButton
                                    appearance={
                                       value.edit
                                          ? BUTTONS_APPEARANCE.ACTIVATE
                                          : BUTTONS_APPEARANCE.DEACTIVATE
                                    }
                                    disabled={true}
                                    size='size-8'
                                 />
                                 <DeleteButton
                                    appearance={
                                       value.delete
                                          ? BUTTONS_APPEARANCE.ACTIVATE
                                          : BUTTONS_APPEARANCE.DEACTIVATE
                                    }
                                    disabled={true}
                                    size='size-8'
                                 />
                              </>
                           )}
                        </div>
                     </div>
                  )
               })}
            </td>
         )
      },
   },
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

export function UsuariosPage() {
   return (
      <AppNavFrame>
         <header className='my-2'>
            <Breadcrumb />

            <div className='mt-2 flex items-center gap-2'>
               <h1 className='h1'>Usuarios</h1>
               <AddButton title='Añade un nuevo usuario' />
            </div>
         </header>

         <main className='2xl:w-[80%]'>
            <form action='' className='flex items-center justify-center'>
               <Search />
            </form>
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

                  <PaginationRangeInfo page={1} perPage={10} total={100} />
               </div>
               <Table columns={Columns} data={usuarios} />
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
