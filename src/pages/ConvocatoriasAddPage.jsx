import { Pagination } from '@mui/material'
import { useState } from 'react'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { DateConvocatoria } from '../components/DateConvocatoria.jsx'
import { Arrow } from '../components/svg/Arrow.jsx'
import { Direccion } from '../components/svg/arrow_direction.js'
import { MailLogo } from '../components/svg/Mail.jsx'
import { MovilLogo } from '../components/svg/Movil.jsx'
import { TelefonoLogo } from '../components/svg/Telefono.jsx'

export function ConvocatoriasAddPage() {
   const [fechaIni, setFechaIni] = useState('')
   const [fechaFin, setFechaFin] = useState('')

   const pasos = ['fechas', 'farmacias', 'farmacias_hospitalarias', 'final']
   const [numPaso, setNumPaso] = useState(1)
   const isButtonLeftDisabled = numPaso === 1
   const isButtonRightDisabled = numPaso === pasos.length

   const buttonActiveClassName =
      'hover-resize text-[var(--color-principal)] h-full'
   const buttonDisabledClassName = 'text-gray-500'
   const buttonLeftClassName = isButtonLeftDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   const buttonRightClassName = isButtonRightDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   function onChangeFechaIni(event) {
      event.target.value
      setFechaIni(event.target.value)
   }

   function onChangeFechaFin(event) {
      event.target.value
      setFechaFin(event.target.value)
   }

   function handleClickRight() {
      setNumPaso(numPaso + 1)
   }

   function handleClickLeft() {
      setNumPaso(numPaso - 1)
   }

   return (
      <AppNavFrame>
         <header>
            <Breadcrumb />
            <h1 className='h1 mt-2'>Crear convocatoria</h1>
         </header>

         <main className='flex grow items-center justify-between'>
            <button
               className={buttonLeftClassName}
               disabled={isButtonLeftDisabled}
               onClick={handleClickLeft}
            >
               <Arrow direccion={Direccion.left} />
            </button>
            {numPaso === 1 && (
               <DateConvocatoria
                  fecha_ini={fechaIni}
                  fecha_fin={fechaFin}
                  onChangeFechaIni={onChangeFechaIni}
                  onChangeFechaFin={onChangeFechaFin}
               />
            )}
            {numPaso === 2 && (
               <div className='mt-2 grow'>
                  <h2 className='h2'>Selección farmacias</h2>
                  <div className='flex grow items-center'>
                     <aside className='border-principal bg-terciario m-4 grow-0 rounded-md !border-2 p-5'>
                        <label htmlFor='seleccion'>Mostrar</label>
                        <select
                           name='seleccion'
                           id='seleccion'
                           className='myoutline ml-4 rounded p-2'
                        >
                           <option value='todos'>Todos</option>
                           <option value='seleccionados'>Seleccionados</option>
                           <option value='no_seleccionados'>
                              No seleccionados
                           </option>
                        </select>
                     </aside>
                     <div className='m-4 grow'>
                        <section>
                           <form className='flex justify-center gap-2'>
                              <input
                                 type='search'
                                 name='buscador'
                                 id='buscador'
                                 className='myoutline block rounded-lg border bg-gray-50 p-2.5 text-gray-900'
                                 placeholder='Buscar ...'
                              />
                              <select
                                 name='filtro'
                                 id='filtro'
                                 className='myoutline rounded p-2'
                              >
                                 <option value='nombre'>
                                    Nombre del centro
                                 </option>
                                 <option value='tutor'>Tutor</option>
                                 <option value='unidad'>Unidad</option>
                                 <option value='localidad'>Localidad</option>
                                 <option value='provincia'>Provincia</option>
                                 <option value='corre'>
                                    Correo electrónico
                                 </option>
                                 <option value='cp'>Código Postal</option>
                                 <option value='telefono'>Teléfono</option>
                                 <option value='movil'>Móvil</option>
                              </select>
                           </form>
                        </section>

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
                           {/* Tabla */}
                           <table className='mytable w-full'>
                              <thead>
                                 <tr className='bg-secundario'>
                                    <th>
                                       <div className='flex justify-center'>
                                          <input
                                             type='checkbox'
                                             name='chk'
                                             id='chk'
                                             className='size-6 self-center'
                                          />
                                       </div>
                                    </th>
                                    <th>Tutor/a</th>
                                    <th>Calle</th>
                                    <th>Localidad</th>
                                    <th>Provincia</th>
                                    <th>CP</th>
                                    <th>Contacto</th>
                                 </tr>
                              </thead>
                              <tbody className=''>
                                 <tr>
                                    <td>
                                       <div className='flex justify-center'>
                                          <input
                                             type='checkbox'
                                             name='chk'
                                             id='chk_1'
                                             className='size-5 self-center'
                                          />
                                       </div>
                                    </td>
                                    <td className='text-center'>
                                       Ángel Ruiz Zafra
                                    </td>
                                    <td className='text-center'>
                                       Calle inventada 2
                                    </td>
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
                                 </tr>
                                 <tr>
                                    <td>
                                       <div className='flex justify-center'>
                                          <input
                                             type='checkbox'
                                             name='chk'
                                             id='chk_2'
                                             className='size-5 self-center'
                                          />
                                       </div>
                                    </td>
                                    <td className='text-center'>
                                       José Carlos López Aguilar
                                    </td>
                                    <td className='text-center'>
                                       C/ Azucena 2 1ºC
                                    </td>
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
                     </div>
                  </div>
               </div>
            )}
            {numPaso === 3 && (
               <div className='mt-2 grow'>
                  <h2 className='h2'>Selección farmacias hospitalarias</h2>
                  <div className='flex grow items-center'>
                     <aside className='border-principal bg-terciario m-4 grow-0 rounded-md !border-2 p-5'>
                        <label htmlFor='seleccion'>Mostrar</label>
                        <select
                           name='seleccion'
                           id='seleccion'
                           className='myoutline ml-4 rounded p-2'
                        >
                           <option value='todos'>Todos</option>
                           <option value='seleccionados'>Seleccionados</option>
                           <option value='no_seleccionados'>
                              No seleccionados
                           </option>
                        </select>
                     </aside>
                     <div className='m-4 grow'>
                        <section>
                           <form className='flex justify-center gap-2'>
                              <input
                                 type='search'
                                 name='buscador'
                                 id='buscador'
                                 className='myoutline block rounded-lg border bg-gray-50 p-2.5 text-gray-900'
                                 placeholder='Buscar ...'
                              />
                              <select
                                 name='filtro'
                                 id='filtro'
                                 className='myoutline rounded p-2'
                              >
                                 <option value='nombre'>
                                    Nombre del centro
                                 </option>
                                 <option value='tutor'>Tutor</option>
                                 <option value='unidad'>Unidad</option>
                                 <option value='localidad'>Localidad</option>
                                 <option value='provincia'>Provincia</option>
                                 <option value='corre'>
                                    Correo electrónico
                                 </option>
                                 <option value='cp'>Código Postal</option>
                                 <option value='telefono'>Teléfono</option>
                                 <option value='movil'>Móvil</option>
                              </select>
                           </form>
                        </section>

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
                           {/* Tabla */}
                           <table className='mytable w-full'>
                              <thead>
                                 <tr className='bg-secundario'>
                                    <th>
                                       <div className='flex justify-center'>
                                          <input
                                             type='checkbox'
                                             name='chk'
                                             id='chk'
                                             className='size-6 self-center'
                                          />
                                       </div>
                                    </th>
                                    <th>Tutor/a</th>
                                    <th>Calle</th>
                                    <th>Localidad</th>
                                    <th>Provincia</th>
                                    <th>CP</th>
                                    <th>Contacto</th>
                                 </tr>
                              </thead>
                              <tbody className=''>
                                 <tr>
                                    <td>
                                       <div className='flex justify-center'>
                                          <input
                                             type='checkbox'
                                             name='chk'
                                             id='chk_1'
                                             className='size-5 self-center'
                                          />
                                       </div>
                                    </td>
                                    <td className='text-center'>
                                       Ángel Ruiz Zafra
                                    </td>
                                    <td className='text-center'>
                                       Calle inventada 2
                                    </td>
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
                                 </tr>
                                 <tr>
                                    <td>
                                       <div className='flex justify-center'>
                                          <input
                                             type='checkbox'
                                             name='chk'
                                             id='chk_2'
                                             className='size-5 self-center'
                                          />
                                       </div>
                                    </td>
                                    <td className='text-center'>
                                       José Carlos López Aguilar
                                    </td>
                                    <td className='text-center'>
                                       C/ Azucena 2 1ºC
                                    </td>
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
                     </div>
                  </div>
               </div>
            )}
            <button
               className={buttonRightClassName}
               disabled={isButtonRightDisabled}
               onClick={handleClickRight}
            >
               <Arrow direccion={Direccion.right} />
            </button>
         </main>
      </AppNavFrame>
   )
}
