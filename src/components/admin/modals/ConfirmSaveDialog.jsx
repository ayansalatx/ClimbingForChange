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

const ConfirmSaveDialog = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onCancel}
      aria-describedby="confirm-save-dialog"
    >
      <DialogTitle>Confirm Save</DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <DialogContentText id="confirm-save-dialog">
          Are you sure you want to save these changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 3 }}
      >
        <CancelButton onClick={onCancel} color="gray" />
        <SaveButton onClick={onConfirm} label="Save" />
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmSaveDialog
