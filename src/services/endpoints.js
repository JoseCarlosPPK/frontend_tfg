const HOST = 'localhost:5000'
const PATH = '/api'
const URL = `http://${HOST}${PATH}`

export const endpoints = {
   auth: `${URL}/auth`,
   centros: `${URL}/centros`,
}
