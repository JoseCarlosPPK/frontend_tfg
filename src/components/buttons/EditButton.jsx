/* eslint-disable react/prop-types */
import { Button, TYPES_BUTTONS } from '.'
import { EditLogo } from '../svg'

export function EditButton({
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
   ...props
}) {
   const buttonColor = type.buttonColor ?? 'bg-yellow-500 hover:bg-yellow-600'
   const svgColor = type.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <EditLogo strokeColor={svgColor} />
      </Button>
   )
}
