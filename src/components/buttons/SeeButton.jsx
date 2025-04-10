/* eslint-disable react/prop-types */
import { Button, TYPES_BUTTONS } from '.'
import { SeeLogo } from '../svg'

export function SeeButton({
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
   ...props
}) {
   const buttonColor = type.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = type.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <SeeLogo strokeColor={svgColor} />
      </Button>
   )
}
