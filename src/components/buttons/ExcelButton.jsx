/* eslint-disable react/prop-types */
import { Button, BUTTONS_APPEARANCE } from '.'
import { ExcelLogo } from '../svg'

export function ExcelButton({
   size = 'size-10',
   appearance = BUTTONS_APPEARANCE.DEFAULT,
   ...props
}) {
   const buttonColor =
      appearance.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = appearance.svgColor ?? 'black'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <ExcelLogo strokeColor={svgColor} />
      </Button>
   )
}
