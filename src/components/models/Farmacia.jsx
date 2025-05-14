import { request } from '../../services'
import { Centro } from './Centro.jsx'

export class Farmacia extends Centro {
   static getCentros(page, perPage, search, filter) {
      return request.farmacias(page, perPage, search, filter)
   }
   static addCentro(centro) {
      return request.addFarmacia(centro)
   }
   static editCentro(centro) {
      return request.editFarmacia(centro)
   }
   static deleteCentro(id) {
      return request.deleteFarmacia(id)
   }
}
