/* eslint-disable react/prop-types */
import { Button, BUTTONS_APPEARANCE } from '.'
import { SeeLogo } from '../svg'

export function SeeButton({
   size = 'size-10',
   appearance = BUTTONS_APPEARANCE.DEFAULT,
   ...props
}) {
   const buttonColor =
      appearance.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = appearance.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <SeeLogo strokeColor={svgColor} />
      </Button>
   )
}
