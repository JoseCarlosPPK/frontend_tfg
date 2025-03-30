/* eslint-disable react/prop-types */
import { Button, TYPES_BUTTONS } from '.'
import { DeleteLogo } from '../svg'

export function DeleteButton({
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
   ...props
}) {
   const buttonColor = type.buttonColor ?? 'bg-red-600 hover:bg-red-700'
   const svgColor = type.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <DeleteLogo strokeColor={svgColor} />
      </Button>
   )
}
