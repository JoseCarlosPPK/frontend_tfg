import { Slide } from '@mui/material'
import { forwardRef } from 'react'

// https://mui.com/material-ui/react-dialog/#transitions
export const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction='up' ref={ref} {...props} />
})
