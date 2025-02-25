/* eslint-disable react/prop-types */
import { SeeLogo } from '../svg/See.jsx'
import { Button } from './Button.jsx'
import { TYPES_BUTTONS } from './types_buttons.js'

export function SeeButton({
   onclick,
   title,
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
}) {
   const buttonColor = type.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = type.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} title={title} onclick={onclick}>
         <SeeLogo strokeColor={svgColor} />
      </Button>
   )
}
