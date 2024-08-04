import React from 'react';
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon from "src/components/icon";
import { Set } from "src/types";
import { categoryAtom, CategoryReducerAction } from 'src/data/categoryReducer';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [getCategory, dispatch] = useAtom(categoryAtom);

  if (!categoryId) {
    return <>This category does not exit</>
  }

  const { name, icon, link, sets } = getCategory(categoryId);

  function onSetUpdated(updatedSet: Set) {
    if (categoryId !== undefined) {
      dispatch({ action: CategoryReducerAction.UPDATE_SET, categoryId, updatedSet });
    }
  }

  function renderSet(set: Set, index: number) {
    const { a, b, practiced, mistakes } = set;
    return (
      <div key={index}>
        <TextField id="a" label={index ? undefined : "Translation A"} variant="standard" value={a}
          onChange={(e) => onSetUpdated({ ...set, a: e.target.value })}
        />
        <TextField id="b" label={index ? undefined : "Translation B"} variant="standard" value={b}
          onChange={(e) => onSetUpdated({ ...set, b: e.target.value })}
        />
        <TextField
          id="standard-number"
          label={index ? undefined : "practiced"}
          type="number"
          disabled
          className='number-field'
          variant="standard"
          value={practiced}
        />
        <TextField
          id="standard-number"
          label={index ? undefined : "Mistakes"}
          type="number"
          disabled
          className='number-field'
          variant="standard"
          value={mistakes}
        />
      </div>
    )
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
        {sets.map(renderSet)}
      </Box>
    </>
  );
}