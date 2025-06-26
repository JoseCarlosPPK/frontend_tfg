import { Pagination } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { AppNavFrame } from '../../components/AppFrame.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { ArrowButton, Button } from '../../components/buttons/index.js'
import { DateConvocatoria } from '../../components/DateConvocatoria.jsx'
import { Input, SearchSelect } from '../../components/inputs/index.js'
import { TIPOS_CENTROS } from '../../components/models/index.js'
import { PaginationRangeInfo } from '../../components/PaginationRangeInfo.jsx'
import { AUTO_HIDE_DURATION } from '../../components/snacbarks/index.js'
import { Direccion } from '../../components/svg/index.js'
import { Table } from '../../components/Table.jsx'
import { useAuth, useQueryString } from '../../hooks/index.js'
import { request } from '../../services/request.js'

export function ConvocatoriasSeePage() {
   const { signOut } = useAuth()

   const id = useLoaderData()
   const notifications = useNotifications()

   const [fechaIni, setFechaIni] = useState('')
   const [fechaFin, setFechaFin] = useState('')

   const pasos = ['Fechas', ...TIPOS_CENTROS, 'Resumen']
   const [numPaso, setNumPaso] = useState(1)
   const isButtonLeftDisabled = numPaso === 1
   const isButtonRightDisabled = numPaso === pasos.length

   const [indexTipoCentro, setIndexTipoCentro] = useState(0)
   const tipoCentroElegido = TIPOS_CENTROS[indexTipoCentro]

   const [centros, setCentros] = useState([])
   const { queryString, setQueryString, handleSubmit, handleSelectChange } =
      useQueryString({ filter: 'nombre' })
   const [totalCentros, setTotalCentros] = useState(0)

   const buttonActiveClassName = 'hover-resize text-[var(--color-principal)]'
   const buttonDisabledClassName = 'text-gray-500'
   const buttonLeftClassName = isButtonLeftDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   const buttonRightClassName = isButtonRightDisabled
      ? buttonDisabledClassName
      : buttonActiveClassName

   function handleClickRight() {
      const newPaso = numPaso + 1
      setNumPaso(newPaso)

      setIndexTipoCentro(newPaso - 2)
   }

   function handleClickLeft() {
      const newPaso = numPaso - 1
      setNumPaso(newPaso)
      setIndexTipoCentro(newPaso - 2)
   }

   /**
    * Carga los centros de la API cuando el número de paso no es 1 ni el último paso.
    * Esto se hace para evitar cargar los centros en el primer paso (fechas) y
    * en el último paso (confirmación).
    */
   useEffect(() => {
      if (numPaso != 1 && numPaso != pasos.length) {
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
                     setCentros(resJson.data)
                     setTotalCentros(resJson.total)
                  })
               } else {
                  setCentros([])
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
   }, [numPaso, queryString])

   /**
    * Resetea el queryString a la página 1 y búsqueda vacía
    * cuando se cambia de paso, excepto en el primer y último paso.
    */
   useEffect(() => {
      if (numPaso != 1 && numPaso != pasos.length) {
         setQueryString((prev) => ({
            ...prev,
            page: 1,
            search: '',
         }))
      }
   }, [numPaso])

   /**
    * Carga los datos de la convocatoria si se ha pasado un id a través
    * de la URL
    */
   useEffect(() => {
      if (id) {
         request
            .getConvocatoria(id)
            .then((res) => {
               if (res.ok) {
                  res.json().then((resJson) => {
                     setFechaIni(resJson.data.fecha_ini)
                     setFechaFin(resJson.data.fecha_fin)
                  })
               } else {
                  if (res.status === 401) {
                     signOut()
                  } else {
                     notifications.show('Error al cargar la convocatoria', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  }
               }
            })
            .catch(() => {
               notifications.show('Fallo de conexión', {
                  severity: 'error',
                  autoHideDuration: AUTO_HIDE_DURATION,
               })
            })

         request
            .getListadoFarmacias(id, { all: true })
            .then((res) => {
               if (res.ok) {
                  res.json().then((resJson) => {})
               } else {
                  if (res.status === 401) {
                     signOut()
                  } else {
                     notifications.show('Error al cargar la convocatoria', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  }
               }
            })
            .catch(() => {
               notifications.show('Fallo de conexión', {
                  severity: 'error',
                  autoHideDuration: AUTO_HIDE_DURATION,
               })
            })

         request
            .getListadoFarmaciasHospitalarias(id, { all: true })
            .then((res) => {
               if (res.ok) {
                  res.json().then((resJson) => {})
               } else {
                  if (res.status === 401) {
                     signOut()
                  } else {
                     notifications.show('Error al cargar la convocatoria', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  }
               }
            })
            .catch(() => {
               notifications.show('Fallo de conexión', {
                  severity: 'error',
                  autoHideDuration: AUTO_HIDE_DURATION,
               })
            })
      }
   }, [])

   return (
      <AppNavFrame>
         <header>
            <Breadcrumb />
            <h1 className='h1 mt-2'>Crear convocatoria</h1>
         </header>

         <div className='flex grow flex-col 2xl:max-w-[80%]'>
            <section className='flex w-full justify-center gap-2'>
               <ArrowButton
                  className={buttonLeftClassName}
                  disabled={isButtonLeftDisabled}
                  onClick={handleClickLeft}
                  direccion={Direccion.left}
               />
               {pasos.map((paso, index) => {
                  return (
                     <Button
                        color={
                           numPaso - 1 === index
                              ? 'bg-secundario'
                              : 'bg-terciario'
                        }
                        size='p-2'
                        key={index}
                        onClick={() => {
                           setNumPaso(index + 1)
                           setIndexTipoCentro(index - 1)
                        }}
                     >
                        {paso.name ?? paso}
                     </Button>
                  )
               })}
               <ArrowButton
                  className={buttonRightClassName}
                  disabled={isButtonRightDisabled}
                  onClick={handleClickRight}
                  direccion={Direccion.right}
               />
            </section>
            <main className='m-2 flex grow'>
               {numPaso === 1 && (
                  <div className='mt-2 flex grow items-center justify-center'>
                     <DateConvocatoria
                        fecha_ini={fechaIni}
                        fecha_fin={fechaFin}
                        onChangeFechaIni={(event) =>
                           setFechaIni(event.target.value)
                        }
                        onChangeFechaFin={(event) =>
                           setFechaFin(event.target.value)
                        }
                     />
                  </div>
               )}
               {numPaso != 1 && numPaso != pasos.length && (
                  <div className='mt-2 grow'>
                     <h2 className='h2'>Selección {tipoCentroElegido.name}</h2>

                     <div className='m-4 grow'>
                        <div className='flex items-center justify-center'>
                           <form
                              className='flex justify-center gap-2'
                              onSubmit={handleSubmit}
                           >
                              <SearchSelect
                                 filters={tipoCentroElegido.getFiltros()}
                                 placeholder='Buscar ... '
                                 handleSelectChange={handleSelectChange}
                                 value={queryString.search}
                                 onChange={(event) => {
                                    setQueryString((prev) => ({
                                       ...prev,
                                       page: 1,
                                       search: event.target.value,
                                    }))
                                 }}
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
                                    min='1'
                                    step='5'
                                    autoComplete='off'
                                    className='w-20'
                                    value={queryString.perPage}
                                    onChange={(event) => {
                                       if (event.target.value > 0) {
                                          setQueryString((prev) => ({
                                             ...prev,
                                             page: 1,
                                             perPage: Number(
                                                event.target.value
                                             ),
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

                              <PaginationRangeInfo
                                 page={queryString.page}
                                 perPage={queryString.perPage}
                                 total={totalCentros}
                              />
                           </div>
                           {/* Tabla */}
                           <Table
                              columns={tipoCentroElegido.getEncabezadosTabla()}
                              data={centros}
                           />

                           {/* Pagination */}
                           <Pagination
                              color='secondary'
                              count={Math.ceil(
                                 totalCentros / queryString.perPage
                              )}
                              page={queryString.page}
                              boundaryCount={2}
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
                     </div>
                  </div>
               )}

               {numPaso === pasos.length && (
                  <div className='mt-2 flex grow flex-col items-center justify-center'>
                     <h2 className='h2 m-3'>Resumen</h2>
                     <div>
                        <section>
                           <table className='mytable'>
                              <thead>
                                 <tr className='bg-secundario'>
                                    <th>Tipo de centro</th>
                                    <th>Nº centros seleccionados</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>Farmacias</td>
                                    <td className='text-center'>{0}</td>
                                 </tr>

                                 <tr>
                                    <td>Farmacias Hospitalarias</td>
                                    <td className='text-center'>{0}</td>
                                 </tr>
                              </tbody>

                              <tfoot>
                                 <tr>
                                    <td className='text-right font-bold'>
                                       Total
                                    </td>
                                    <td className='text-center'>{0}</td>
                                 </tr>
                              </tfoot>
                           </table>
                        </section>
                     </div>
                  </div>
               )}
            </main>
         </div>
      </AppNavFrame>
   )
}
