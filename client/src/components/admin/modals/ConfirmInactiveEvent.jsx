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
import SaveButton from '../buttons/SaveButton'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmInactiveEvent = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onCancel}
      aria-describedby="confirm-inactive-dialog"
    >
      <DialogTitle>{'Confirm Inactive'}</DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to make this event inactive?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 3 }}>
        <CancelButton onClick={onCancel} color={'gray'}></CancelButton>
        <SaveButton onClick={onConfirm} label={'Confirm'}></SaveButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmInactiveEvent
