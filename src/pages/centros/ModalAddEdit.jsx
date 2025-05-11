import { useNotifications } from '@toolpad/core'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Error } from '../../components/Error.jsx'
import { Modal } from '../../components/Modal.jsx'
import { Transition } from '../../components/Transition.jsx'
import { ArrowButton, Button, DeleteButton } from '../../components/buttons'
import { Input, Search } from '../../components/inputs'
import { AUTO_HIDE_DURATION } from '../../components/snacbarks/index.js'
import { Direccion } from '../../components/svg/arrow_direction.js'
import { useAuth } from '../../hooks/useAuth.js'
import { request } from '../../services/request.js'

export function ModalAddEdit({
   open,
   onClose,
   onConfirm,
   centro,
   setCentro,
   error,
   edit = false,
}) {
   const { signOut } = useAuth()
   const notifications = useNotifications()
   const [tutoresBuscados, setTutoresBuscados] = useState([])
   const [searchTutores, setSearchTutores] = useState('')
   const [pageTutores, setPageTutores] = useState(1)
   const [totalTutores, setTotalTutores] = useState(0)
   const perPageTutores = 10

   function fetchTutores(name, page, perPage) {
      request
         .getPersonas(name, page, perPage)
         .then((res) => {
            if (res.ok) {
               res.json().then((resJson) => {
                  setTutoresBuscados(resJson.data)
                  setTotalTutores(resJson.total)
               })
            } else {
               if (res.status === 401) {
                  signOut()
               } else {
                  notifications.show('Algo falló', {
                     severity: 'error',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  })
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

   /**
    * Añade un nuevo input para añadir un tutor/a
    */
   function handleAddTutor(persona = {}) {
      const newTutores = [...centro.personas]
      newTutores.push(Object.assign(persona, { idTmp: crypto.randomUUID() }))
      setCentro((prev) => ({
         ...prev,
         personas: newTutores,
      }))
   }

   function existeTutor(buscado) {
      return centro.personas.some((tutor) => tutor.id === buscado.id)
   }

   return (
      <Modal
         open={open}
         onClose={onClose}
         onConfirm={onConfirm}
         title='Añadir un nuevo centro'
         form={true}
         dialogProps={{
            fullWidth: true,
            scroll: 'body',
            fullScreen: true,
            slots: {
               transition: Transition,
            },
         }}
      >
         <div className='divide-y-2 lg:grid lg:grid-cols-2 lg:divide-x-2 lg:divide-y-0'>
            <div className='p-2'>
               <h2 className='h2'>Tutores</h2>
               <div className='my-3'>
                  <label
                     htmlFor='tutorBuscado'
                     className='mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Buscar al tutor/a
                  </label>
                  <Search
                     value={searchTutores}
                     onChange={(event) => {
                        const newValue = event.target.value
                        setSearchTutores(newValue)
                        setPageTutores(1)

                        if (newValue === '') {
                           setTutoresBuscados([])
                        }
                     }}
                     name='tutorBuscado'
                     id='tutorBuscado'
                     placeholder='Tutor/a'
                     className='w-full'
                     onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                           event.preventDefault()
                           fetchTutores(
                              searchTutores,
                              pageTutores,
                              perPageTutores
                           )
                        }
                     }}
                     onClick={() => {
                        fetchTutores(searchTutores, pageTutores, perPageTutores)
                     }}
                  />

                  {tutoresBuscados.length > 0 && (
                     <div className='divide-y divide-gray-400 rounded-lg border border-gray-400'>
                        {tutoresBuscados.map((value) => {
                           return (
                              <p
                                 className='hover-resalt flex items-center justify-between rounded-lg p-1 hover:cursor-pointer'
                                 key={value.id}
                                 onClick={() => {
                                    if (!existeTutor(value)) {
                                       handleAddTutor(value)
                                    }
                                 }}
                              >
                                 {value.nombre}
                                 {existeTutor(value) && (
                                    <span className='rounded-lg bg-green-700 p-1 text-white'>
                                       seleccionado
                                    </span>
                                 )}
                              </p>
                           )
                        })}
                        <div className='mx-2 flex items-center justify-between'>
                           <ArrowButton
                              type='button'
                              size='size-8'
                              direccion={Direccion.left}
                              disabled={pageTutores === 1}
                              className={
                                 pageTutores === 1 ? 'text-gray-600' : ''
                              }
                              onClick={() => {
                                 const newPage = pageTutores - 1
                                 setPageTutores(newPage)
                                 fetchTutores(
                                    searchTutores,
                                    newPage,
                                    perPageTutores
                                 )
                              }}
                           />
                           <ArrowButton
                              type='button'
                              size='size-8'
                              direccion={Direccion.right}
                              disabled={
                                 pageTutores * perPageTutores >= totalTutores
                              }
                              className={
                                 pageTutores * perPageTutores >= totalTutores
                                    ? 'text-gray-600'
                                    : ''
                              }
                              onClick={() => {
                                 const newPage = pageTutores + 1
                                 setPageTutores(newPage)
                                 fetchTutores(
                                    searchTutores,
                                    newPage,
                                    perPageTutores
                                 )
                              }}
                           />
                        </div>
                     </div>
                  )}
               </div>

               <header className='flex justify-between'>
                  <h3 className='h3'>Listado de tutores/as</h3>
                  <span>{centro.personas.length} tutores/as añadidos</span>
               </header>
               <div>
                  <ul>
                     {centro.personas.map((value, index) => {
                        return (
                           <li
                              key={value.idTmp}
                              className='my-2 flex items-center gap-3'
                           >
                              <Input
                                 value={value.nombre ?? ''}
                                 className={`w-full p-1 ${!edit && value.id ? 'bg-gray-500/60' : ''}`}
                                 placeholder='Nombre y apellidos'
                                 name={`tutor_${index}`}
                                 required
                                 disabled={!edit && value.id}
                                 autoFocus={
                                    index === centro.personas.length - 1
                                 }
                                 onChange={(event) => {
                                    const newTutores = [...centro.personas]
                                    newTutores[index].nombre =
                                       event.target.value
                                    setCentro((prev) => ({
                                       ...prev,
                                       personas: newTutores,
                                    }))
                                 }}
                              />
                              <DeleteButton
                                 type='button'
                                 size='size-7'
                                 onClick={() => {
                                    const newTutores = [...centro.personas]
                                    newTutores.splice(index, 1)

                                    setCentro((prev) => ({
                                       ...prev,
                                       personas: newTutores,
                                    }))
                                 }}
                              ></DeleteButton>
                           </li>
                        )
                     })}
                  </ul>
                  <div className='flex justify-center'>
                     <Button
                        color='bg-green-600 hover:bg-green-700 text-white'
                        size='p-2'
                        type='button'
                        onClick={() => handleAddTutor()}
                     >
                        Añadir
                     </Button>
                  </div>
               </div>
               {error.personas && <Error>{error.personas}</Error>}
            </div>

            <div className='p-2'>
               <h3 className='h3'>Datos del centro</h3>

               <div className='my-3'>
                  <label
                     htmlFor='nombre'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Nombre
                  </label>
                  <Input
                     type='text'
                     value={centro.nombre ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           nombre: event.target.value,
                        }))
                     }}
                     name='nombre'
                     id='nombre'
                     className='w-full p-2'
                     placeholder='Farmacia San Rafael'
                     required
                  />

                  {error.nombre && <Error>{error.nombre}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='direccion'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Dirección
                  </label>
                  <Input
                     type='text'
                     value={centro.direccion ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           direccion: event.target.value,
                        }))
                     }}
                     name='direccion'
                     id='direccion'
                     className='w-full p-2'
                     placeholder='C/ ... '
                     required
                  />
                  {error.direccion && <Error>{error.direccion}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='localidad'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Localidad
                  </label>
                  <Input
                     type='text'
                     value={centro.localidad ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           localidad: event.target.value,
                        }))
                     }}
                     name='localidad'
                     id='localidad'
                     className='w-full p-2'
                     placeholder='Localidad'
                     required
                  />
                  {error.localidad && <Error>{error.localidad}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='provincia'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Provincia
                  </label>
                  <Input
                     type='text'
                     value={centro.provincia ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           provincia: event.target.value,
                        }))
                     }}
                     name='provincia'
                     id='provincia'
                     className='w-full p-2'
                     placeholder='Provincia'
                     required
                  />
                  {error.provincia && <Error>{error.provincia}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='cp'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Código Postal
                  </label>
                  <Input
                     type='number'
                     value={centro.cp ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           cp: event.target.value,
                        }))
                     }}
                     name='cp'
                     id='cp'
                     className='w-full p-2'
                     placeholder='Código Postal'
                     required
                  />
                  {error.cp && <Error>{error.cp}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='correo'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Correo electrónico
                  </label>
                  <Input
                     type='email'
                     value={centro.correo ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           correo: event.target.value,
                        }))
                     }}
                     name='correo'
                     id='correo'
                     className='w-full p-2'
                     placeholder='ejemplo@gmail.com'
                     required
                  />
                  {error.correo && <Error>{error.correo}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='telefono'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Teléfono
                  </label>
                  <Input
                     type='tel'
                     value={centro.telefono ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           telefono: event.target.value,
                        }))
                     }}
                     name='telefono'
                     id='telefono'
                     className='w-full p-2'
                     placeholder='XXX XX XX XX'
                  />
                  {error.telefono && <Error>{error.telefono}</Error>}
               </div>

               <div className='my-3'>
                  <label
                     htmlFor='movil'
                     className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                  >
                     Móvil
                  </label>
                  <Input
                     type='tel'
                     value={centro.movil ?? ''}
                     onChange={(event) => {
                        setCentro((prev) => ({
                           ...prev,
                           movil: event.target.value,
                        }))
                     }}
                     name='movil'
                     id='movil'
                     className='w-full p-2'
                     placeholder='XXX XX XX XX'
                  />
                  {error.movil && <Error>{error.movil}</Error>}
               </div>
            </div>
         </div>
         {error.generico && <Error>{error.generico}</Error>}
      </Modal>
   )
}

ModalAddEdit.propTypes = {
   open: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onConfirm: PropTypes.func.isRequired,
   centro: PropTypes.shape({
      nombre: PropTypes.string,
      direccion: PropTypes.string,
      localidad: PropTypes.string,
      provincia: PropTypes.string,
      cp: PropTypes.string,
      correo: PropTypes.string,
      telefono: PropTypes.string,
      movil: PropTypes.string,
      personas: PropTypes.array,
   }).isRequired,
   setCentro: PropTypes.func.isRequired,
   error: PropTypes.object,
   edit: PropTypes.bool,
}
