// https://flask-jwt-extended.readthedocs.io/en/stable/token_locations.html#cookies
export function getCookie(name) {
   const value = `; ${document.cookie}`
   const parts = value.split(`; ${name}=`)
   if (parts.length === 2) return parts.pop().split(';').shift()
}
