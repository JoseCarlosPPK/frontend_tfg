import { MailLogo } from '../svg/Mail.jsx'
import { MovilLogo } from '../svg/Movil.jsx'
import { TelefonoLogo } from '../svg/Telefono.jsx'

export const FarmaciasColumnas = [
   {
      name: 'Tutor/a',
      createCell: (row) => {
         return (
            <td key={row.tutor} className='text-center'>
               {row.tutor}
            </td>
         )
      },
   },
   {
      name: 'Calle',
      createCell: (row) => {
         return (
            <td key={row.calle} className='text-center'>
               {row.calle}
            </td>
         )
      },
   },
   {
      name: 'Localidad',
      createCell: (row) => {
         return (
            <td key={row.localidad} className='text-center'>
               {row.localidad}
            </td>
         )
      },
   },
   {
      name: 'Provincia',
      createCell: (row) => {
         return (
            <td key={row.provincia} className='text-center'>
               {row.provincia}
            </td>
         )
      },
   },
   {
      name: 'CP',
      createCell: (row) => {
         return (
            <td key={row.cp} className='text-center'>
               {row.cp}
            </td>
         )
      },
   },
   {
      name: 'Contacto',
      createCell: (row) => {
         return (
            <td key={row.correo} className='text-center'>
               <div className='flex flex-col justify-center'>
                  <div className='flex items-center gap-2'>
                     <MailLogo />
                     <span>{row.correo}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <TelefonoLogo />
                     <span>{row.telefono}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <MovilLogo />
                     <span>{row.movil}</span>
                  </div>
               </div>
            </td>
         )
      },
   },
]

export const FarmaciasHospitalariasColumnas = [
   {
      name: 'Tutor/a',
      createCell: (row) => {
         return (
            <td key={row.tutor} className='text-center'>
               {row.tutor}
            </td>
         )
      },
   },
   {
      name: 'Nombre del centro',
      createCell: (row) => {
         return (
            <td key={row.nombre} className='text-center'>
               {row.nombre}
            </td>
         )
      },
   },
   {
      name: 'Calle',
      createCell: (row) => {
         return (
            <td key={row.calle} className='text-center'>
               {row.calle}
            </td>
         )
      },
   },
   {
      name: 'Localidad',
      createCell: (row) => {
         return (
            <td key={row.localidad} className='text-center'>
               {row.localidad}
            </td>
         )
      },
   },
   {
      name: 'Provincia',
      createCell: (row) => {
         return (
            <td key={row.provincia} className='text-center'>
               {row.provincia}
            </td>
         )
      },
   },
   {
      name: 'CP',
      createCell: (row) => {
         return (
            <td key={row.cp} className='text-center'>
               {row.cp}
            </td>
         )
      },
   },
   {
      name: 'Contacto',
      createCell: (row) => {
         return (
            <td key={row.correo} className='text-center'>
               <div className='flex flex-col justify-center'>
                  <div className='flex items-center gap-2'>
                     <MailLogo />
                     <span>{row.correo}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <TelefonoLogo />
                     <span>{row.telefono}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                     <MovilLogo />
                     <span>{row.movil}</span>
                  </div>
               </div>
            </td>
         )
      },
   },
]
