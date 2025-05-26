const HOST = 'localhost:5000'
const PATH = '/api'
const URL = `http://${HOST}${PATH}`

export const endpoints = {
   auth: `${URL}/auth`,
   farmacias: `${URL}/farmacias`,
   farmaciasHospitalarias: `${URL}/farmacias-hospitalarias`,
   personas: `${URL}/personas`,
   convocatorias: `${URL}/convocatorias`,
}
