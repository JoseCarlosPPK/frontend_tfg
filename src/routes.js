const BASE_CONVOCATORIAS = '/convocatorias'
const BASE_ADMIN = '/admin'

export const Routes = {
   Home: '/',
   Centros: '/centros',
   Convocatorias: BASE_CONVOCATORIAS,
   ConvocatoriasAdd: `${BASE_CONVOCATORIAS}/nueva`,
   ConvocatoriasEdit: `${BASE_CONVOCATORIAS}/editar`,
   ConvocatoriasSee: `${BASE_CONVOCATORIAS}/ver`,
   Login: '/login',
   Correo: '/correo',
   Admin: BASE_ADMIN,
   AdminUsuarios: `${BASE_ADMIN}/usuarios`,
   AdminRegistros: `${BASE_ADMIN}/registros`,
}
