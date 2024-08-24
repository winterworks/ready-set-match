import React from 'react';
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Icon, { ENABLED_ICON } from "src/components/icon";
import { collectionsAtom, CollectionReducerAction} from 'src/data/collectionReducer';
import SetsTable from 'src/components/setsTable';
import { findCollection } from 'src/helpers/findCollection';
import DeleteConfirm from 'src/components/deleteConfirm';

export default function CollectionDetail() {
  const { collectionId } = useParams();
  const [collections, setCollection] = useAtom(collectionsAtom);

  const collection = collectionId ? findCollection(collections, collectionId) : undefined;
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
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
            setCollection({
              action: CollectionReducerAction.UPDATE_COLLECTION,
              collection: { ...collection, name: e.target.value }
            });
          }}/>
        <FormControl variant="standard" sx={{ marginRight: 1, width: 100, }}>
          <InputLabel id="collection-icon">Icon</InputLabel>
          <Select
            labelId="collection-icon"
            id="collection-icon"
            value={collection.icon}
            label="Icon"
            onChange={(e) => {
              setCollection({
                action: CollectionReducerAction.UPDATE_COLLECTION,
                collection: { ...collection, icon: (e.target.value as ENABLED_ICON) }
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
        <FormControl variant="standard" sx={{ marginRight: 1, width: 150, marginTop: 1 }}>
          <InputLabel id="parentCollectionId">Parent collection</InputLabel>
          <Select
            labelId="parentCollectionId"
            id="parentCollectionId"
            value={collection.parentCollectionId || ''}
            label="parentCollectionId"
            onChange={(e) => {
              const parentCollectionId = e.target.value != 'default' ? e.target.value : undefined;
              setCollection({
                action: CollectionReducerAction.UPDATE_COLLECTION,
                collection: { ...collection, parentCollectionId }
              });
            }}
          >
            {collections.map((coll) => (
              <MenuItem key={coll.id} value={coll.id}>
                {coll.name}
              </MenuItem>
            ))}
            <MenuItem key={'default'} value={'default'}>
              None
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="link"
          label="Link"
          variant="standard"
          value={collection.link}
          onChange={(e) => {
            setCollection({
              action: CollectionReducerAction.UPDATE_COLLECTION,
              collection: { ...collection, link: e.target.value }
            });
          }}/>
        <br/>
        <FormControlLabel
          control={
            <Switch
              checked={collection.aIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCollection({
                  action: CollectionReducerAction.UPDATE_COLLECTION,
                  collection: { ...collection, aIsLarge: e.target.checked }
                });
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
                setCollection({
                  action: CollectionReducerAction.UPDATE_COLLECTION,
                  collection: { ...collection, bIsLarge: e.target.checked }
                });
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