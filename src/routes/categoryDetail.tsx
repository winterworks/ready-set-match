import React from 'react';
import { Box, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { categoriesAtom, CategoryReducerAction } from 'src/data/categoryReducer';
import DeleteConfirm from 'src/components/deleteConfirm';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [categories, setCategory] = useAtom(categoriesAtom);

  const category = categoryId && categories.find((category) => category.id === categoryId);
  if (!categoryId || !category) {
    return <>This category does not exist</>
  }

  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom>
        {category.name}
      </Typography>
      <DeleteConfirm
        onConfirm={() => { } }
        title={`Delete ${category.name}`}
        message={`Are you sure you want to delete ${category.name}?`}
      />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          '& .MuiTextField-root.number-field': { width: '100px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={category.name}
          onChange={(e) => {
            setCategory({
              action: CategoryReducerAction.UPDATE_CATEGORY,
              category: { ...category, name: e.target.value }
            });
          }}/>
      </Box>
    </>
  );
}