import * as React from 'react'
import Button, { ButtonOwnProps } from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface props {
  buttonText: string
  buttonProps: ButtonOwnProps

  title: string
  message: string
  cancelText: string
  confirmText: string

  onConfirm: () => void
}

export default function ConfirmAction({ buttonText, buttonProps, title, message, cancelText, confirmText, onConfirm }: props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        {...buttonProps}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">{cancelText}</Button>
          <Button onClick={onConfirm} {...buttonProps}>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
