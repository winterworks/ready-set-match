import React from 'react';
import { Button, DialogContentText, MenuItem } from "@mui/material";
import { Add } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom } from 'jotai';
import { categoriesAtom, CategoryReducerAction } from 'src/data/categoryReducer';

interface Props {
  onClick: () => void
}

export default function CategoryCreate({ onClick }: Props) {
  const [open, setOpen] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [categories, setCategory] = useAtom(categoriesAtom);

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
      <MenuItem onClick={onClickMenu}><Add />Add Category</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const newCategory = {
              name: newCategoryName
            }
            setCategory({ action: CategoryReducerAction.CREATE_CATEGORY, categoryId: newCategoryName, category: newCategory })
            handleClose();
          },
        }}
      >
        <DialogTitle>Create a new category</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <TextField
            autoFocus
            required
            id="name"
            label="Category name"
            type="text"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => { setNewCategoryName(e.target.value); }}
          />
          {categories.find(({ name }) => name === newCategoryName) && <DialogContentText>This name already exists</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}