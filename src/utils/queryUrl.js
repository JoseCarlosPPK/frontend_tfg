export function queryString(queryParams = {}) {
   let queryString = ''
   for (const [key, value] of Object.entries(queryParams)) {
      queryString += `${key}=${value}&`
   }

   queryString = queryString.slice(0, queryString.length - 1)

   return queryString
}
