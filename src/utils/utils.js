export const MesesDate = {
   0: 'enero',
   1: 'febrero',
   2: 'marzo',
   3: 'abril',
   4: 'mayo',
   5: 'junio',
   6: 'julio',
   7: 'agosto',
   8: 'septiembre',
   9: 'octubre',
   10: 'noviembre',
   11: 'diciembre',
   Enero: 0,
   Febrero: 1,
   Marzo: 2,
   Abril: 3,
   Mayo: 4,
   Junio: 5,
   Julio: 6,
   Agosto: 7,
   Septiembre: 8,
   Octubre: 9,
   Noviembre: 10,
   Diciembre: 11,
}

/**
 * Determina el curso al que pertenece una convocatoria. Para
 * ello se compara con una fecha umbral que limita un curso
 * con otro. En los cursos académicos el último día de julio
 * suele ser el final del curso actual.
 * @param {Date} dateConvocatoria Fecha de la convocatoria.
 * @param {number} limitMonth Último mes que pertenece al curso.
 * @see Meses
 * @param {number} [limitDay=31] Último día que pertenece al curso junto
 * con el mes.
 * @returns {number} Curso de la convocatoria.
 */
export function getCurso(dateConvocatoria, limitMonth, limitDay = 31) {
   return dateConvocatoria.getMonth() <= limitMonth &&
      dateConvocatoria.getDate() <= limitDay
      ? dateConvocatoria.getFullYear() - 1
      : dateConvocatoria.getFullYear()
}

/**
 * Convierte una fecha en un formato string a un objeto Date
 * @param {string} stringFecha Fecha en formato yyyy/mm/dd, aunque depende de sep.
 * @param {string} [sep='/'] Separador del formato fecha. Por defecto es /.
 * @returns {Date} Objeto Date que representa la fecha indicada.
 */
export function stringFechaToDate(stringFecha, sep = '/') {
   const [year, month, day] = stringFecha.split(sep)
   return new Date(year, month - 1, day)
}
