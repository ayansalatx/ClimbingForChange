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

const ConfirmActivateEvent = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onCancel}
      aria-describedby="confirm-activate-dialog"
    >
      <DialogTitle>Confirm Activation</DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <DialogContentText id="confirm-activate-dialog-description">
          Are you sure you want to activate this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 3 }}>
        <CancelButton onClick={onCancel} color="gray" />
        <SaveButton onClick={onConfirm} label="Activate" />
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmActivateEvent
