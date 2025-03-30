import { Pagination } from '@mui/material'
import { AppNavFrame } from '../../components/AppFrame.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { Input, Select } from '../../components/inputs'
import { ClockLogo, UserLogo } from '../../components/svg'
import { Table } from '../../components/Table.jsx'
import registros from '../../data/registro.json'

const SelectFechas = [
   {
      value: 'lastDay',
      text: 'Últimas 24 horas',
   },
   {
      value: 'lastWeek',
      text: 'Última semana',
   },
   {
      value: 'lastMonth',
      text: 'Último mes',
   },
   {
      value: 'lastYear',
      text: 'Último año',
   },
   {
      value: 'allTime',
      text: 'Todo el tiempo',
   },
]

const SelectAcciones = [
   {
      value: 'all',
      text: 'Todas las acciones',
   },
   {
      value: 'add',
      text: 'Añadir',
   },
   {
      value: 'edit',
      text: 'Editar',
   },
   {
      value: 'delete',
      text: 'Eliminar',
   },
]

const Columns = [
   {
      name: (
         <span className='flex justify-center'>
            <ClockLogo />
         </span>
      ),
      createCell: (row) => {
         return (
            <td key={row.date} className='text-center'>
               {row.date}
            </td>
         )
      },
   },
   {
      name: (
         <span className='flex justify-center'>
            <UserLogo />
         </span>
      ),
      createCell: (row) => {
         return (
            <td key={row.user} className='text-center'>
               {row.user}
            </td>
         )
      },
   },
   {
      name: 'Acción',
      createCell: (row) => {
         let customClassName = 'rounded-lg p-2 w-20 text-center'

         if (row.action === 'add') {
            customClassName += ' bg-green-500'
         } else if (row.action === 'edit') {
            customClassName += ' bg-yellow-500'
         } else if (row.action === 'delete') {
            customClassName += ' bg-red-600'
         } else {
            customClassName += ' bg-gray-700'
         }

         return (
            <td key={row.action} className='flex justify-center'>
               <div className={customClassName}>
                  <span>{row.action}</span>
               </div>
            </td>
         )
      },
   },
   {
      name: 'Endpoint',
      createCell: (row) => {
         return (
            <td key={row.endpoint} className='text-center'>
               {row.endpoint}
            </td>
         )
      },
   },
]

export function RegistrosPage() {
   return (
      <AppNavFrame>
         <header className='my-2'>
            <Breadcrumb />
            <h1 className='h1 mt-2'>Registro de acciones</h1>
         </header>

         <main className='mt-2 lg:flex lg:gap-4'>
            <aside className='border-principal bg-terciario grid grid-cols-2 items-center gap-2 rounded-md !border-2 p-5 lg:w-72'>
               <label htmlFor='fecha' className='grow-0'>
                  Fecha
               </label>
               <Select id='fecha'>
                  {SelectFechas.map((fecha, index) => {
                     return (
                        <option value={fecha.value} key={index}>
                           {fecha.text}
                        </option>
                     )
                  })}
               </Select>

               <label htmlFor='accion' className='grow-0'>
                  Acción
               </label>
               <Select id='accion'>
                  {SelectAcciones.map((accion, index) => {
                     return (
                        <option value={accion.value} key={index}>
                           {accion.text}
                        </option>
                     )
                  })}
               </Select>

               <label htmlFor='usuario' className='grow-0'>
                  Usuario
               </label>
               <Input
                  type='search'
                  name='busquedaUsuario'
                  placeholder='Usuario'
                  id='usuario'
               />

               <label htmlFor='endpoint' className='grow-0'>
                  Endpoint
               </label>
               <Input
                  type='search'
                  name='busquedaEndpoint'
                  placeholder='/centros'
                  id='endpoint'
               />
            </aside>

            <div className='w-full 2xl:w-[80%]'>
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
               <Table columns={Columns} data={registros.data} />
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
