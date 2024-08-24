import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface props {
  title: string;
  message: string;

  cancelText?: string;
  confirmText?: string;

  onConfirm: () => void;
}

export default function DeleteConfirm({ title, message, cancelText, confirmText, onConfirm }: props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        color='error'
        variant='outlined'
        sx={{ float: "right" }}
        onClick={handleClickOpen}
      >
        Delete
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
          <Button onClick={handleClose} variant='contained'>{cancelText ?? 'Cancel'}</Button>
          <Button onClick={onConfirm} color='error' >{confirmText ?? 'Delete'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}