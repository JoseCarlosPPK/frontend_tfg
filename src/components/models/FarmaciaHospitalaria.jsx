import { request } from '../../services'
import { Centro } from './Centro.jsx'

export class FarmaciaHospitalaria extends Centro {
   static getEncabezadosTabla() {
      const nuevosEncabezados = super.getEncabezadosTabla()
      nuevosEncabezados.splice(0, 1)

      return nuevosEncabezados
   }

   static getCentros(page, perPage, search, filter) {
      return request.farmaciasHospitalarias(page, perPage, search, filter)
   }
   static addCentro(centro) {
      return request.addFarmaciaHospitalaria(centro)
   }
   static editCentro(centro) {
      return request.editFarmaciaHospitalaria(centro)
   }
   static deleteCentro(id) {
      return request.deleteFarmaciaHospitalaria(id)
   }
}
