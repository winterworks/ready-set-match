import React from 'react';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon, { ENABLED_ICON } from "src/components/icon";
import { categoryAtom, CategoryReducerAction} from 'src/data/categoryReducer';
import SetsTable from 'src/components/setsTable';
import CategoryDelete from 'src/components/categoryDelete';
import { Category } from 'src/types';

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [getCategory, setCategory] = useAtom(categoryAtom);

  const category = categoryId ? getCategory(categoryId) : undefined;
  if (!categoryId || !category) {
    return <>This category does not exist</>
  }

  function updateCategory(categoryId: string, category: Category) {
    setCategory({
      action: CategoryReducerAction.UPDATE_CATEGORY,
      categoryId: categoryId,
      category
    });
  }

  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom>
        {category.name}
      </Typography>
      <CategoryDelete categoryId={categoryId} category={category} />
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
            updateCategory(categoryId, { ...category, name: e.target.value })
          }}/>
        <FormControl variant="standard" sx={{ marginRight: 1, width: 100 }}>
          <InputLabel id="category-icon">Icon</InputLabel>
          <Select
            labelId="category-icon"
            id="category-icon"
            value={category.icon}
            label="Icon"
            onChange={(e) => {
              updateCategory(categoryId, { ...category, icon: (e.target.value as ENABLED_ICON) })
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
            updateCategory(categoryId, { ...category, link: e.target.value })
          }}/>
        <br/>
        <FormControlLabel
          control={
            <Switch
              checked={category.aIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateCategory(categoryId, { ...category, aIsLarge: e.target.checked })
              }}
            />
          }
          label="Value A large"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              checked={category.bIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateCategory(categoryId, { ...category, bIsLarge: e.target.checked })
              }}
            />
          }
          label="Value B large"
          labelPlacement="start"
        />
        <Typography component="h3" variant="h5" gutterBottom>
          Sets
        </Typography>
        <SetsTable categoryId={categoryId} sets={category.sets}/>
      </Box>
    </>
  );
}