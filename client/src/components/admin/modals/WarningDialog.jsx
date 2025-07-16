import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material'
import { forwardRef } from 'react'

import CancelButton from '../buttons/CancelButton'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const WarningDialog = ({ open, title, message, onCancel }) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onCancel}
      aria-describedby='confirm-delete-dialog'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <DialogContentText id='alert-dialog-slide-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 3 }}>
        <CancelButton onClick={onCancel} color={'gray'}></CancelButton>
      </DialogActions>
    </Dialog>
  )
}

export default WarningDialog
