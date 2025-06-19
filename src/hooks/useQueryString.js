import { useState } from 'react'

export function useQueryString(page = 1, perPage = 10) {
   const [queryString, setQueryString] = useState({
      page: page,
      perPage: perPage,
      search: '',
      filter: '',
   })

   function handleSubmit(event) {
      event.preventDefault()

      const form = new FormData(event.target)

      // Si se repite la búsqueda no la hacemos
      if (queryString.search === form.get('search')) return

      setQueryString((prev) => ({
         ...prev,
         page: 1,
         search: form.get('search'),
         filter: form.get('filter'),
      }))
   }

   function handleSelectChange(event) {
      setQueryString((prev) => ({
         ...prev,
         page: 1,
         filter: event.target.value,
      }))
   }

   return {
      queryString,
      setQueryString,
      handleSubmit,
      handleSelectChange,
   }
}
