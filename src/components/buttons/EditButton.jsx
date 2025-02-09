/* eslint-disable react/prop-types */
import { EditLogo } from '../svg/Edit.jsx'
import { Button } from './Button.jsx'
import { TYPES_BUTTONS } from './types_buttons.js'

export function EditButton({
   onclick,
   title,
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
}) {
   const buttonColor = type.buttonColor ?? 'bg-yellow-500 hover:bg-yellow-600'
   const svgColor = type.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} title={title} onclick={onclick}>
         <EditLogo strokeColor={svgColor} />
      </Button>
   )
}
