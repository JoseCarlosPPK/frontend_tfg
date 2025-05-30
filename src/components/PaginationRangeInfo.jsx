import PropTypes from 'prop-types'

export function PaginationRangeInfo({ page, perPage, total }) {
   const start = page * perPage - perPage + 1
   const end = Math.min(page * perPage, total)
   return (
      <span>
         {start}-{end} de {total}
      </span>
   )
}

PaginationRangeInfo.propTypes = {
   page: PropTypes.number.isRequired,
   perPage: PropTypes.number.isRequired,
   total: PropTypes.number.isRequired,
}
