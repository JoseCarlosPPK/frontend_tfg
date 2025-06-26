import { createBrowserRouter } from 'react-router'
import {
   AdminPage,
   CentrosPage,
   ConvocatoriasAddEditPage,
   ConvocatoriasPage,
   ConvocatoriasSeePage,
   CorreoPage,
   PrincipalPage,
   RegistrosPage,
   UsuariosPage,
} from './pages'

export const router = createBrowserRouter([
   {
      path: '/',
      errorElement: <h1 className='h1'>404 NOT FOUND</h1>,
      children: [
         {
            index: true,
            element: <PrincipalPage />,
         },
         {
            path: 'centros',
            element: <CentrosPage />,
         },
         {
            path: 'convocatorias',
            children: [
               {
                  index: true,
                  element: <ConvocatoriasPage />,
               },
               {
                  path: ':id',
                  element: <ConvocatoriasSeePage />,
                  loader: ({ params }) => {
                     return params.id
                  },
               },
               {
                  path: 'edit/:id',
                  element: <ConvocatoriasAddEditPage />,
                  loader: ({ params }) => {
                     return params.id
                  },
               },
               {
                  path: 'add',
                  element: <ConvocatoriasAddEditPage />,
               },
            ],
         },
         {
            path: 'correo',
            element: <CorreoPage />,
         },
         {
            path: 'admin',
            children: [
               {
                  index: true,
                  element: <AdminPage />,
               },
               {
                  path: 'usuarios',
                  element: <UsuariosPage />,
               },
               {
                  path: 'registros',
                  element: <RegistrosPage />,
               },
            ],
         },
      ],
   },
])

const BASE_CONVOCATORIAS = '/convocatorias'
const BASE_ADMIN = '/admin'

export const routes = {
   Home: '/',
   Centros: '/centros',
   Convocatorias: BASE_CONVOCATORIAS,
   ConvocatoriasAdd: `${BASE_CONVOCATORIAS}/add`,
   ConvocatoriasEdit: `${BASE_CONVOCATORIAS}/edit`,
   ConvocatoriasSee: BASE_CONVOCATORIAS, // hay que pasarle un id (/:id)
   Login: '/login',
   Correo: '/correo',
   Admin: BASE_ADMIN,
   AdminUsuarios: `${BASE_ADMIN}/usuarios`,
   AdminRegistros: `${BASE_ADMIN}/registros`,
}
