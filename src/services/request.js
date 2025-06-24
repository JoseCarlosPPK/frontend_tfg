import { getCookie } from '../utils/cookies.js'
import { queryString } from '../utils/queryUrl.js'
import { endpoints } from './endpoints.js'

export class Request {
   #endpoints

   constructor(endpoints) {
      this.#endpoints = endpoints
   }

   /**
    * Método de clase para realizar peticiones HTTP. Sirve de base para realizar
    * peticiones donde se necesita autenticación (se incluye la cabecera `credentials: 'include'` para que se pasen las cookies).
    *
    * Si la petición es POST o PUT:
    *  - Se añade la cabecera `Content-Type: application/json` y `Accept: application/json`.
    *  - Se añade el body de la petición como JSON.
    *
    * @param {string} url URL para realizar la petición
    * @param {string} method Método HTTP (GET, POST, PUT, DELETE...)
    * @param {object} body Cuerpo de la petición (solo para POST y PUT)
    * @returns {Promise<Response>} Respuesta de la petición
    */
   static request(url, method = 'GET', body = null) {
      let headers = {}
      let requestOptions = {
         method: method,
         credentials: 'include', // https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors#credentials-are-a-special-case
         headers: headers,
      }

      if (method != 'GET') {
         Object.assign(headers, {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
         })
      }

      if (method === 'POST' || method === 'PUT') {
         Object.assign(headers, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         })

         Object.assign(requestOptions, {
            body: JSON.stringify(body),
         })
      }

      return fetch(url, requestOptions)
   }

   auth(username, password) {
      return Request.request(this.#endpoints.auth, 'POST', {
         username: username,
         password: password,
      })
   }

   farmacias(page, perPage, search, filter) {
      return Request.request(
         `${this.#endpoints.farmacias}?page=${page}&per_page=${perPage}&search=${search}&filter=${filter}`,
         'GET'
      )
   }

   deleteFarmacia(id) {
      return Request.request(`${this.#endpoints.farmacias}/${id}`, 'DELETE')
   }

   addFarmacia(farmacia) {
      return Request.request(this.#endpoints.farmacias, 'POST', farmacia)
   }

   editFarmacia(farmacia) {
      return Request.request(
         `${this.#endpoints.farmacias}/${farmacia.id}`,
         'PUT',
         farmacia
      )
   }

   farmaciasHospitalarias(page, perPage, search, filter) {
      return Request.request(
         `${this.#endpoints.farmaciasHospitalarias}?page=${page}&per_page=${perPage}&search=${search}&filter=${filter}`,
         'GET'
      )
   }

   deleteFarmaciaHospitalaria(id) {
      return Request.request(
         `${this.#endpoints.farmaciasHospitalarias}/${id}`,
         'DELETE'
      )
   }

   addFarmaciaHospitalaria(farmaciasHospitalarias) {
      return Request.request(
         this.#endpoints.farmaciasHospitalarias,
         'POST',
         farmaciasHospitalarias
      )
   }

   editFarmaciaHospitalaria(farmaciasHospitalarias) {
      return Request.request(
         `${this.#endpoints.farmaciasHospitalarias}/${farmaciasHospitalarias.id}`,
         'PUT',
         farmaciasHospitalarias
      )
   }

   getPersonas(name, page, perPage) {
      return Request.request(
         `${this.#endpoints.personas}?page=${page}&per_page=${perPage}&name=${name}`,
         'GET'
      )
   }

   getConvocatorias() {
      return Request.request(this.#endpoints.convocatorias)
   }

   getConvocatoria(id) {
      return Request.request(`${this.#endpoints.convocatorias}/${id}`)
   }

   addConvocatoria(convocatoria) {
      return Request.request(
         this.#endpoints.convocatorias,
         'POST',
         convocatoria
      )
   }

   getListadoFarmacias(
      id,
      queryParams = { all: false, page: 1, perPage: 10, search: '', filter: '' }
   ) {
      return Request.request(
         `${this.#endpoints.listadoFarmacias}/${id}?${queryString(queryParams)}`
      )
   }

   getListadoFarmaciasHospitalarias(
      id,
      queryParams = { all: false, page: 1, perPage: 10, search: '', filter: '' }
   ) {
      return Request.request(
         `${this.#endpoints.listadoFarmaciasHospitalarias}/${id}?${queryString(queryParams)}`
      )
   }
}

export const request = new Request(endpoints)
