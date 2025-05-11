/* eslint-disable react/prop-types */
import { Button, BUTTONS_APPEARANCE } from '.'
import { DeleteLogo } from '../svg'

export function DeleteButton({
   size = 'size-10',
   appearance = BUTTONS_APPEARANCE.DEFAULT,
   ...props
}) {
   const buttonColor = appearance.buttonColor ?? 'bg-red-600 hover:bg-red-700'
   const svgColor = appearance.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <DeleteLogo strokeColor={svgColor} />
      </Button>
   )
}
