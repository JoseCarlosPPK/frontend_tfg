import { Pagination } from '@mui/material'
import { useState } from 'react'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { ArrowButton } from '../components/buttons'
import { Input, SearchSelect, Select } from '../components/inputs'
import {
   FarmaciasColumnas,
   FarmaciasHospitalariasColumnas,
} from '../components/models/columns.jsx'
import { filters } from '../components/models/filters.js'
import { Direccion } from '../components/svg'
import { Table } from '../components/Table.jsx'
import farmacias from '../data/farmacias.json'
import farmacias_hospitalarias from '../data/farmacias_hospitalarias.json'

export function CorreoPage() {
   const [numPaso, setNumPaso] = useState(1)
   const pasos = ['farmacias', 'farmacias_hospitalarias', 'subject_msg']
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
      setNumPaso(numPaso + 1)
   }

   function handleClickLeft() {
      setNumPaso(numPaso - 1)
   }

   return (
      <AppNavFrame>
         <header className='my-2 flex justify-between'>
            <div>
               <Breadcrumb />
               <h1 className='h1 mt-2'>Correo</h1>
            </div>
            <div>
               <span className='text-lg font-bold'>uncorreo@example.com</span>
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
               {numPaso === 1 && (
                  <>
                     <h2 className='h2'>Selección farmacias</h2>
                     <div className='grow items-center lg:flex'>
                        <aside className='border-principal bg-terciario m-4 grid grow-0 grid-cols-2 gap-2 rounded-md !border-2 p-5'>
                           <label htmlFor='seleccion' className='grow-0'>
                              Seleccionar
                           </label>
                           <Select
                              name='seleccion'
                              id='seleccion'
                              className='ml-4'
                           >
                              <option value='' disabled={true} selected={true}>
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
                           <form className='flex justify-center gap-2'>
                              <SearchSelect filters={filters} />
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
                              {/* Tabla */}
                              <Table
                                 columns={FarmaciasColumnas}
                                 data={farmacias.data}
                                 checked={true}
                              />

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
                  </>
               )}
               {numPaso === 2 && (
                  <>
                     <h2 className='h2'>Selección farmacias hospitalarias</h2>
                     <div className='grow items-center lg:flex'>
                        <aside className='border-principal bg-terciario m-4 grid grow-0 grid-cols-2 gap-2 rounded-md !border-2 p-5'>
                           <label htmlFor='seleccion' className='grow-0'>
                              Seleccionar
                           </label>
                           <Select
                              name='seleccion'
                              id='seleccion'
                              className='ml-4'
                           >
                              <option value='' disabled={true} selected={true}>
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
                           <SearchSelect filters={filters} />

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
                              {/* Tabla */}
                              <Table
                                 columns={FarmaciasHospitalariasColumnas}
                                 data={farmacias_hospitalarias.data}
                                 checked={true}
                              />

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
                  </>
               )}
               {numPaso === 3 && (
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
                        <button className='bg-secundario rounded-lg p-2 text-lg hover:bg-purple-800'>
                           Enviar
                        </button>
                     </div>
                  </div>
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
