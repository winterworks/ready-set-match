import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon, { ENABLED_ICON } from "src/components/icon";
import { categoryAtom, CategoryReducerAction} from 'src/data/categoryReducer';
import SetsTable from 'src/components/setsTable';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [getCategory, setCategory] = useAtom(categoryAtom);

  const category = categoryId && getCategory(categoryId);
  if (!categoryId || !category) {
    return <>This category does not exit</>
  }

  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom>
        {category.name}
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
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={category.name}
          onChange={(e) => {
            setCategory({
              action: CategoryReducerAction.UPDATE_CATEGORY,
              categoryId: categoryId,
              category: { ...category, name: e.target.value }
            });
          }}/>
        <FormControl variant="standard" sx={{ marginRight: 1, width: 100 }}>
          <InputLabel id="category-icon">Icon</InputLabel>
          <Select
            labelId="category-icon"
            id="category-icon"
            value={category.icon}
            label="Icon"
            onChange={(e) => {
              setCategory({
                action: CategoryReducerAction.UPDATE_CATEGORY,
                categoryId: categoryId,
                category: { ...category, icon: (e.target.value as ENABLED_ICON) }
             });
            }}
          >
            {Object.values(ENABLED_ICON).map((enabledIcon) => (
              <MenuItem key={enabledIcon} value={enabledIcon} >
                <Icon iconName={enabledIcon} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="link"
          label="Link"
          variant="standard"
          value={category.link}
          onChange={(e) => {
            setCategory({
              action: CategoryReducerAction.UPDATE_CATEGORY,
              categoryId: categoryId,
              category: { ...category, link: e.target.value }
            });
          }}/>
        <Typography component="h3" variant="h5" gutterBottom>
          Sets
        </Typography>
        <SetsTable categoryId={categoryId} sets={category.sets}/>
      </Box>
    </>
  );
}