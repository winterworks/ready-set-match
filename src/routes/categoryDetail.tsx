import React from 'react';
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon from "src/components/icon";
import { categoryAtom} from 'src/data/categoryReducer';
import SetsTable from 'src/components/setsTable';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [getCategory] = useAtom(categoryAtom);

  if (!categoryId) {
    return <>This category does not exit</>
  }

  const { name, icon, link, sets } = getCategory(categoryId);

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
        <SetsTable categoryId={categoryId} sets={sets}/>
      </Box>
    </>
  );
}