/* eslint-disable react/prop-types */
import { Button, BUTTONS_APPEARANCE } from '.'
import { AddLogo } from '../svg'

export function AddButton({
   size = 'size-10',
   appearance = BUTTONS_APPEARANCE.DEFAULT,
   ...props
}) {
   const buttonColor =
      appearance.buttonColor ?? 'bg-green-600 hover:bg-green-700'
   const svgColor = appearance.svgColor ?? 'white'

   return (
      <Button color={buttonColor} size={size} {...props}>
         <AddLogo strokeColor={svgColor} />
      </Button>
   )
}
