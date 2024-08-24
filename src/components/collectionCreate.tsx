import React from 'react';
import { Button, DialogContentText, MenuItem } from "@mui/material";
import { Add } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom } from 'jotai';
import { collectionsAtom, CollectionReducerAction } from 'src/data/collectionReducer';
import { findCollection } from 'src/helpers/findCollection';

interface Props {
  onClick: () => void
}

export default function CollectionCreate({ onClick }: Props) {
  const [open, setOpen] = React.useState(false);
  const [newCollectionName, setNewCollectionName] = React.useState('');
  const [collections, setCollection] = useAtom(collectionsAtom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClick();
  };

  const onClickMenu = () => {
    handleClickOpen();
  }

  return (
    <React.Fragment>
      <MenuItem onClick={onClickMenu}><Add />Add Collection</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const newCollection = {
              name: newCollectionName
            }
            setCollection({ action: CollectionReducerAction.CREATE_COLLECTION, collection: newCollection })
            handleClose();
          },
        }}
      >
        <DialogTitle>Create a new collection</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <TextField
            autoFocus
            required
            id="name"
            label="Collection name"
            type="text"
            fullWidth
            variant="standard"
            value={newCollectionName}
            onChange={(e) => { setNewCollectionName(e.target.value); }}
          />
          {findCollection(collections, newCollectionName) && <DialogContentText>This name already exists</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}