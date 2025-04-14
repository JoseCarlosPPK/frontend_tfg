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
      let requestOptions = {
         method: method,
         credentials: 'include',
      }

      if (method === 'POST' || method === 'PUT') {
         Object.assign(requestOptions, {
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
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
}

export const request = new Request(endpoints)
