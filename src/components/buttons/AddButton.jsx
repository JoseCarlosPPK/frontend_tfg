/* eslint-disable react/prop-types */
import { Button, TYPES_BUTTONS } from '.'
import { AddLogo } from '../svg'

export function AddButton({
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
   ...props
}) {
   const buttonColor = type.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = type.svgColor ?? 'white'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <AddLogo strokeColor={svgColor} />
      </Button>
   )
}
