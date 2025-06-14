import { useNotifications } from '@toolpad/core'
import { useState } from 'react'
import { AUTO_HIDE_DURATION } from '../components/snacbarks'
import { useAuth } from './useAuth.js'

export function useSelected(
   tipoCentroElegido,
   totalCentros,
   queryString,
   defaultValue = (element) => {
      return element.id
   }
) {
   const [selected, setSelected] = useState(new Map())
   const notifications = useNotifications()
   const { signOut } = useAuth()

   // Handle onClick event to select/unselect all the items
   function handleClickGeneralCheckbox(event) {
      if (event.target.checked) {
         tipoCentroElegido
            .getCentros(1, totalCentros, queryString.search, queryString.filter)
            .then((res) => {
               if (res.ok) {
                  res.json().then((resJson) => {
                     const newSelected = new Map(selected)
                     resJson.data.map((value) => {
                        if (!selected.has(value.id)) {
                           newSelected.set(value.id, defaultValue(value))
                        }
                     })

                     setSelected(newSelected)
                  })
               } else {
                  if (res.status === 401) {
                     signOut()
                  } else {
                     // alerta de error
                     notifications.show('Hubo algún problema', {
                        severity: 'error',
                        autoHideDuration: AUTO_HIDE_DURATION,
                     })
                  }
               }
            })
            .catch(() => {
               // alerta de error
               notifications.show('Fallo de conexión', {
                  severity: 'error',
                  autoHideDuration: AUTO_HIDE_DURATION,
               })
            })
      } else {
         if (queryString.search === '') {
            setSelected(new Map())
         } else {
            tipoCentroElegido
               .getCentros(
                  1,
                  totalCentros,
                  queryString.search,
                  queryString.filter
               )
               .then((res) => {
                  if (res.ok) {
                     res.json().then((resJson) => {
                        const newSelected = new Map(selected)
                        resJson.data.map((value) => {
                           newSelected.delete(value.id)
                        })

                        setSelected(newSelected)
                     })
                  } else {
                     if (res.status === 401) {
                        signOut()
                     } else {
                        // alerta de error
                        notifications.show('Hubo algún problema', {
                           severity: 'error',
                           autoHideDuration: AUTO_HIDE_DURATION,
                        })
                     }
                  }
               })
               .catch(() => {
                  // alerta de error
                  notifications.show('Fallo de conexión', {
                     severity: 'error',
                     autoHideDuration: AUTO_HIDE_DURATION,
                  })
               })
         }
      }
   }

   function toggleSelected(element) {
      const newSelected = new Map(selected)

      if (selected.has(element.id)) {
         newSelected.delete(element.id)
      } else {
         newSelected.set(element.id, defaultValue(element))
      }

      setSelected(newSelected)
   }

   return { selected, setSelected, handleClickGeneralCheckbox, toggleSelected }
}
