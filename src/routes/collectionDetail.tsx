import React from 'react';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import Icon, { ENABLED_ICON } from "src/components/icon";
import { collectionsAtom, CollectionReducerAction} from 'src/data/collectionReducer';
import SetsTable from 'src/components/setsTable';
import { Collection } from 'src/types';
import { findCollection } from 'src/helpers/findCollection';
import { categoriesAtom } from 'src/data/categoryReducer';
import DeleteConfirm from 'src/components/deleteConfirm';

export default function CollectionDetail() {
  const { collectionId } = useParams();
  const [collections, setCollection] = useAtom(collectionsAtom);
  const [categories] = useAtom(categoriesAtom);
  const navigate = useNavigate();

  const collection = collectionId ? findCollection(collections, collectionId) : undefined;
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
  }

  function updateCollection(collectionId: string, collection: Collection) {
    let oldCollectionId;
    if (collectionId !== collection.name) {
      // The name/key has changed, update the url
      navigate(`/collection/${collection.name}`);
      oldCollectionId = collectionId
    }

    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collectionId,
      collection,
      oldCollectionId
    });
  }

  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom>
        {collection.name}
      </Typography>
      <DeleteConfirm
        onConfirm={() => {
          setCollection({ action: CollectionReducerAction.DELETE_COLLECTION, collectionId });
        }}
        title={`Delete ${collection.name}`}
        message={`Are you sure you want to delete ${collection.name}?`}
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
          value={collection.name}
          onChange={(e) => {
            updateCollection(collectionId, { ...collection, name: e.target.value })
          }}/>
        <FormControl variant="standard" sx={{ marginRight: 1, width: 100 }}>
          <InputLabel id="collection-icon">Icon</InputLabel>
          <Select
            labelId="collection-icon"
            id="collection-icon"
            value={collection.icon}
            label="Icon"
            onChange={(e) => {
              updateCollection(collectionId, { ...collection, icon: (e.target.value as ENABLED_ICON) })
            }}
          >
            {Object.values(ENABLED_ICON).map((enabledIcon) => (
              <MenuItem key={enabledIcon} value={enabledIcon} >
                <Icon iconName={enabledIcon} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ marginRight: 1, width: 100 }}>
          <InputLabel>Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={collection.category}
            label="Category"
            onChange={(e) => {
              updateCollection(collectionId, { ...collection, category: e.target.value })
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="link"
          label="Link"
          variant="standard"
          value={collection.link}
          onChange={(e) => {
            updateCollection(collectionId, { ...collection, link: e.target.value })
          }}/>
        <br/>
        <FormControlLabel
          control={
            <Switch
              checked={collection.aIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateCollection(collectionId, { ...collection, aIsLarge: e.target.checked })
              }}
            />
          }
          label="Value A large"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              checked={collection.bIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateCollection(collectionId, { ...collection, bIsLarge: e.target.checked })
              }}
            />
          }
          label="Value B large"
          labelPlacement="start"
        />
        <Typography component="h3" variant="h5" gutterBottom>
          Sets
        </Typography>
        <SetsTable collectionId={collectionId} sets={collection.sets}/>
      </Box>
    </>
  );
}