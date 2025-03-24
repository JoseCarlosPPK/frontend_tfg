import { Pagination } from '@mui/material'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { AddButton } from '../components/buttons/AddButton.jsx'
import { DeleteButton } from '../components/buttons/DeleteButton.jsx'
import { EditButton } from '../components/buttons/EditButton.jsx'
import { MailLogo } from '../components/svg/Mail.jsx'
import { MovilLogo } from '../components/svg/Movil.jsx'
import { TelefonoLogo } from '../components/svg/Telefono.jsx'

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
                  <input
                     type='text'
                     name='buscador'
                     className='myoutline block rounded-lg border bg-gray-50 p-2.5 text-gray-900'
                     placeholder='Buscar ...'
                  />
                  <select name='filtros' className='myoutline rounded-lg p-1'>
                     <option value='nombre'>Nombre del centro</option>
                     <option value='responsable'>Tutor</option>
                     <option value='localidad'>Localidad</option>
                     <option value='provincia'>Provincia</option>
                     <option value='cp'>Código Postal</option>
                     <option value='correo'>Correo electrónico</option>
                     <option value='telefono'>Teléfono</option>
                     <option value='movil'>Móvil</option>
                  </select>
               </form>
            </div>
            {/* Contenedor genérico para la tabla y paginación */}
            <div>
               {/* Cantidad de elementos a ver */}
               <div className='mx-16 my-2 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <label htmlFor='amount_centers'>Ver</label>
                     <input
                        id='amount_centers'
                        type='number'
                        inputMode='numeric'
                        name='amount_centers'
                        list='opt_amount_centers'
                        defaultValue='10'
                        min='10'
                        step='10'
                        autoComplete='off'
                        className='myoutline w-20 rounded-lg border bg-gray-50 p-1'
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
               <table className='mytable w-full'>
                  <thead>
                     <tr className='bg-secundario'>
                        <th>Tutor/a</th>
                        <th>Calle</th>
                        <th>Localidad</th>
                        <th>Provincia</th>
                        <th>CP</th>
                        <th>Contacto</th>
                        <th>Acción</th>
                     </tr>
                  </thead>
                  <tbody className=''>
                     <tr>
                        <td className='text-center'>Ángel Ruiz Zafra</td>
                        <td className='text-center'>Calle inventada 2</td>
                        <td className='text-center'>Chana</td>
                        <td className='text-center'>Granada</td>
                        <td className='text-center'>18001</td>
                        <td className='pl-6'>
                           <div className='flex flex-col justify-center'>
                              <div className='flex items-center gap-2'>
                                 <MailLogo />
                                 <span>aruiz@ugr.es</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                 <TelefonoLogo />
                                 <span>958 57 18 95</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                 <MovilLogo />
                                 <span>675 53 05 07</span>
                              </div>
                           </div>
                        </td>
                        <td>
                           <div className='flex items-center justify-center gap-2'>
                              <EditButton />
                              <DeleteButton />
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <td className='text-center'>
                           José Carlos López Aguilar
                        </td>
                        <td className='text-center'>C/ Azucena 2 1ºC</td>
                        <td className='text-center'>Armilla</td>
                        <td className='text-center'>Granada</td>
                        <td className='text-center'>18100</td>
                        <td className='pl-6'>
                           <div className='flex flex-col justify-center'>
                              <div className='flex items-center gap-2'>
                                 <MailLogo />
                                 <span>jcarloslopez@ugr.es</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                 <TelefonoLogo />
                                 <span>958 57 18 95</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                 <MovilLogo />
                                 <span>675 53 05 07</span>
                              </div>
                           </div>
                        </td>
                        <td>
                           <div className='flex items-center justify-center gap-2'>
                              <EditButton />
                              <DeleteButton />
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
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
