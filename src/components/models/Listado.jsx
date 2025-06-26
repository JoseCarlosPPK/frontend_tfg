export class Listado {
   #model
   #id
   #getRequest

   get model() {
      return this.#model
   }

   constructor(id, model, getRequest) {
      this.#id = id
      this.#model = model
      this.#getRequest = getRequest
   }

   getFiltros() {
      const filtros = this.#model.getFiltros()
      filtros.push({ label: 'Nº plazas', name: 'num_plazas' })
      return filtros
   }

   getEncabezadosTabla() {
      const encabezados = this.#model.getEncabezadosTabla()
      encabezados.splice(2, 0, {
         name: 'Nº plazas',
         createCell: (row) => {
            return (
               <td
                  key={`${row.id_centro}_${row.num_plazas}`}
                  className='text-center'
               >
                  {row.num_plazas}
               </td>
            )
         },
      })

      return encabezados
   }

   getCentros(page, perPage, search, filter) {
      const queryParams = {
         page: page,
         per_page: perPage,
         search: search,
         filter: filter,
      }

      return this.#getRequest(this.#id, queryParams)
   }
}
