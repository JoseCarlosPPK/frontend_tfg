import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { AppNavFrame } from '../components/AppFrame.jsx'
import { Breadcrumb } from '../components/Breadcrumb.jsx'
import { ArrowButton } from '../components/buttons'
import { DateConvocatoria } from '../components/DateConvocatoria.jsx'
import { Input, SearchSelect, Select } from '../components/inputs'
import { TIPOS_CENTROS } from '../components/models'
import { PaginationRangeInfo } from '../components/PaginationRangeInfo.jsx'
import { Direccion } from '../components/svg'
import { Table } from '../components/Table.jsx'
import { useQueryString, useSelected } from '../hooks'

export function ConvocatoriasAddPage() {
   const [fechaIni, setFechaIni] = useState('')
   const [fechaFin, setFechaFin] = useState('')

   const pasos = ['fechas', 'farmacias', 'farmacias_hospitalarias', 'final']
   const [numPaso, setNumPaso] = useState(1)
   const isButtonLeftDisabled = numPaso === 1
   const isButtonRightDisabled = numPaso === pasos.length

   const [indexTipoCentro, setIndexTipoCentro] = useState(0)
   const tipoCentroElegido = TIPOS_CENTROS[indexTipoCentro]

   const [centros, setCentros] = useState([])
   const { queryString, setQueryString, handleSubmit, handleSelectChange } =
      useQueryString()
   const [totalCentros, setTotalCentros] = useState(0)
   const { selected, setSelected, handleClickGeneralCheckbox } = useSelected(
      tipoCentroElegido,
      totalCentros,
      queryString
   )

   const buttonActiveClassName =
      'hover-resize text-[var(--color-principal)] h-96'
   const buttonDisabledClassName = 'text-gray-500'
   const buttonLeftClassName = isButtonLeftDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   const buttonRightClassName = isButtonRightDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   function onChangeFechaIni(event) {
      setFechaIni(event.target.value)
   }

   function onChangeFechaFin(event) {
      setFechaFin(event.target.value)
   }

   function handleClickRight() {
      const newPaso = numPaso + 1
      setNumPaso(newPaso)

      if (newPaso > 2 && newPaso < pasos.length) {
         setIndexTipoCentro(indexTipoCentro + 1)
      }
   }

   function handleClickLeft() {
      const newPaso = numPaso - 1
      setNumPaso(newPaso)
      if (newPaso > 1 && newPaso < pasos.length - 1) {
         setIndexTipoCentro(indexTipoCentro - 1)
      }
   }

   useEffect(() => {
      if (numPaso != 1 && numPaso != pasos.length) {
         tipoCentroElegido.getCentros(1, 10, '', '').then((res) => {
            res.json().then((resJson) => {
               setCentros(resJson.data)
            })
         })
      }
   }, [numPaso])

   return (
      <AppNavFrame>
         <header>
            <Breadcrumb />
            <h1 className='h1 mt-2'>Crear convocatoria</h1>
         </header>

         <main className='flex grow items-center justify-between'>
            <ArrowButton
               className={buttonLeftClassName}
               disabled={isButtonLeftDisabled}
               onClick={handleClickLeft}
               direccion={Direccion.left}
            />

            {numPaso === 1 && (
               <DateConvocatoria
                  fecha_ini={fechaIni}
                  fecha_fin={fechaFin}
                  onChangeFechaIni={onChangeFechaIni}
                  onChangeFechaFin={onChangeFechaFin}
               />
            )}
            {numPaso != 1 && numPaso != pasos.length && (
               <div className='mt-2 grow'>
                  <h2 className='h2'>Selección {tipoCentroElegido.name}</h2>
                  <div className='flex grow items-center'>
                     <aside className='border-principal bg-terciario m-4 grow-0 rounded-md !border-2 p-5'>
                        <label htmlFor='seleccion'>Mostrar</label>
                        <Select
                           name='seleccion'
                           id='seleccion'
                           className='ml-4'
                        >
                           <option value='todos'>Todos</option>
                           <option value='seleccionados'>Seleccionados</option>
                           <option value='no_seleccionados'>
                              No seleccionados
                           </option>
                        </Select>
                     </aside>
                     <div className='m-4 grow'>
                        <form className='flex justify-center gap-2'>
                           <SearchSelect
                              filters={tipoCentroElegido.getFiltros()}
                              placeholder='Buscar ... '
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

                              <PaginationRangeInfo
                                 page={1}
                                 perPage={10}
                                 total={100}
                              />
                           </div>
                           {/* Tabla */}
                           <Table
                              columns={tipoCentroElegido.getEncabezadosTabla()}
                              data={centros}
                              checked={true}
                              selected={selected}
                              setSelected={setSelected}
                              total={totalCentros}
                              onSelectAllClick={handleClickGeneralCheckbox}
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
               </div>
            )}

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
