/* eslint-disable react/prop-types */
import { Button, TYPES_BUTTONS } from '.'
import { MailLogo } from '../svg'

export function MailButton({
   size = 'size-10',
   type = TYPES_BUTTONS.DEFAULT,
   ...props
}) {
   const buttonColor = type.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = type.svgColor ?? 'white'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <MailLogo strokeColor={svgColor} />
      </Button>
   )
}
