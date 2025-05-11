/* eslint-disable react/prop-types */
import { Button, BUTTONS_APPEARANCE } from '.'
import { MailLogo } from '../svg'

export function MailButton({
   size = 'size-10',
   appearance = BUTTONS_APPEARANCE.DEFAULT,
   ...props
}) {
   const buttonColor =
      appearance.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = appearance.svgColor ?? 'white'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <MailLogo strokeColor={svgColor} />
      </Button>
   )
}
