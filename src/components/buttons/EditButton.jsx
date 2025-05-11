/* eslint-disable react/prop-types */
import { Button, BUTTONS_APPEARANCE } from '.'
import { EditLogo } from '../svg'

export function EditButton({
   size = 'size-10',
   appearance = BUTTONS_APPEARANCE.DEFAULT,
   ...props
}) {
   const buttonColor =
      appearance.buttonColor ?? 'bg-yellow-500 hover:bg-yellow-600'
   const svgColor = appearance.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <EditLogo strokeColor={svgColor} />
      </Button>
   )
}
