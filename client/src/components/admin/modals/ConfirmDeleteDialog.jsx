import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material'
import CancelButton from '../buttons/CancelButton'
import DeleteButton from '../buttons/DeleteButton'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmDeleteDialog = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onCancel}
      aria-describedby="confirm-delete-dialog"
    >
      <DialogTitle>{'Confirm Delete'}</DialogTitle>
      <DialogContent sx={{py: 0}}>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 3 }}>
        <CancelButton onClick={onCancel} color={'gray'}></CancelButton>
        <DeleteButton onClick={onConfirm}></DeleteButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
