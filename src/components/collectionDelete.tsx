import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Collection } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { collectionAtom, CollectionReducerAction } from 'src/data/collectionReducer';
import { useAtom } from 'jotai';

interface props {
  collectionId: string;
  collection: Collection;
}

export default function CollectionDelete({ collectionId, collection }: props) {
  const [open, setOpen] = React.useState(false);
  const [, setCollection] = useAtom(collectionAtom);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setCollection({ action: CollectionReducerAction.DELETE_COLLECTION, collectionId });
    navigate("/");
  }

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
          {`Delete ${collection.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <b>{collection.name}</b> and all the sets?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Cancel</Button>
          <Button onClick={handleDelete} color='error' >Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}