import { Button } from '@mui/material'
import React from 'react'

const DeleteButton = ({ onClick, label = 'Delete' }) => {
  return (
    <Button variant="contained" color="error" onClick={onClick}>
      {label}
    </Button>
  )
}

export default DeleteButton