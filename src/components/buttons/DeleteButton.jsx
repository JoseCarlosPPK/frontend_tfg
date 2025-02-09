/* eslint-disable react/prop-types */
import { DeleteLogo } from '../svg/Delete.jsx'
import { Button } from './Button.jsx'
import { TYPES_BUTTONS } from './types_buttons.js'

export function DeleteButton({
   onclick,
   title,
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
}) {
   const buttonColor = type.buttonColor ?? 'bg-red-600 hover:bg-red-700'
   const svgColor = type.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} title={title} onclick={onclick}>
         <DeleteLogo strokeColor={svgColor} />
      </Button>
   )
}
