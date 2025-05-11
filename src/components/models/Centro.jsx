import { MailLogo, MovilLogo, TelefonoLogo } from '../svg'

export class Centro {
   static getRepresentacionInputs = () => {
      return [
         { label: 'Nombre', type: 'text', name: 'nombre', required: true },
         {
            label: 'Dirección',
            type: 'text',
            name: 'direccion',
            required: true,
         },
         {
            label: 'Localidad',
            type: 'text',
            name: 'localidad',
            required: true,
         },
         {
            label: 'Provincia',
            type: 'text',
            name: 'provincia',
            required: true,
         },
         { label: 'Código Postal', type: 'number', name: 'cp', required: true },
         {
            label: 'Correo electrónico',
            type: 'email',
            name: 'correo',
            required: true,
         },
         { label: 'Teléfono', type: 'tel', name: 'telefono' },
         { label: 'Móvil', type: 'tel', name: 'movil' },
      ]
   }

   static getCentroVacio() {
      // Sin id, ya que es un atributo que solo lo trae si viene de la BD
      return {
         nombre: '',
         direccion: '',
         localidad: '',
         provincia: '',
         cp: '',
         telefono: '',
         movil: '',
         correo: '',
         personas: [],
      }
   }

   static getFiltros() {
      return [
         { label: 'Nombre del centro', name: 'nombre' },
         { label: 'Tutor/a', name: 'personas' },
         { label: 'Dirección', name: 'direccion' },
         { label: 'Localidad', name: 'localidad' },
         { label: 'Provincia', name: 'provincia' },
         { label: 'Código Postal', name: 'cp' },
         { label: 'Correo electrónico', name: 'correo' },
         { label: 'Teléfono', name: 'telefono' },
         { label: 'Móvil', name: 'movil' },
      ]
   }

   static getEncabezadosTabla() {
      return [
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
            name: 'Tutor/a',
            createCell: (row) => {
               return (
                  <td key={`${row.id}_${row.personas}`} className='text-center'>
                     {row.personas.map((p) => {
                        return <p key={p.id}>{p.nombre}</p>
                     })}
                  </td>
               )
            },
         },
         {
            name: 'Calle',
            createCell: (row) => {
               return (
                  <td
                     key={`${row.id}_${row.direccion}`}
                     className='text-center'
                  >
                     {row.direccion}
                  </td>
               )
            },
         },
         {
            name: 'Localidad',
            createCell: (row) => {
               return (
                  <td
                     key={`localidad_${row.id}_${row.localidad}`}
                     className='text-center'
                  >
                     {row.localidad}
                  </td>
               )
            },
         },
         {
            name: 'Provincia',
            createCell: (row) => {
               return (
                  <td
                     key={`provincia_${row.id}_${row.provincia}`}
                     className='text-center'
                  >
                     {row.provincia}
                  </td>
               )
            },
         },
         {
            name: 'CP',
            createCell: (row) => {
               return (
                  <td key={`${row.id}_${row.cp}`} className='text-center'>
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
   }
}
