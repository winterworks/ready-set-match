import React from 'react';
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon from "src/components/icon";
import { Set } from "src/types";
import { categoryAtom, CategoryReducerAction, NewSet } from 'src/data/categoryReducer';
import SetAddForm from 'src/components/setAddForm';
import SetDetails from 'src/components/setDetail';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [getCategory, dispatch] = useAtom(categoryAtom);

  if (!categoryId) {
    return <>This category does not exit</>
  }

  const { name, icon, link, sets } = getCategory(categoryId);

  function onSetUpdated(set: Set) {
    if (categoryId !== undefined) {
      dispatch({ action: CategoryReducerAction.UPDATE_SET, categoryId, set });
    }
  }

  function addSet(set: NewSet) {
    if (categoryId === undefined) {
      return;
    }
    dispatch({ action: CategoryReducerAction.ADD_SET, categoryId, set });
  }

  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          '& .MuiTextField-root.number-field': { width: '100px' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography component="h3" variant="h5" gutterBottom>
          Category info
        </Typography>
        <TextField id="name" label="Name" variant="standard" value={name} />
        <TextField
          id="icon"
          label="Icon"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon && (<Icon iconName={icon} />)}
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={icon}
        />
        <TextField id="link" label="Link" variant="standard" value={link} />
        <Typography component="h3" variant="h5" gutterBottom>
          Sets
        </Typography>
        <SetAddForm onSetAdded={addSet} />
        {sets.map(set =>
          <SetDetails key={set.id} set={set} onSetChanged={onSetUpdated} />
        )}
      </Box>
    </>
  );
}