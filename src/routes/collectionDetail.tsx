import React from 'react'
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import Icon, { ENABLED_ICON } from 'src/components/icon'
import { collectionsAtom, CollectionReducerAction } from 'src/data/collectionReducer'
import SetsTable from 'src/components/setsTable'
import { findCollection, findSubCollections } from 'src/helpers/collectionHelpers'
import DeleteConfirm from 'src/components/deleteConfirm'
import CollectionsGird from 'src/components/collectionGird'
import { HeaderMenu } from 'src/components/headerMenu'

export default function CollectionDetail() {
  const { collectionId } = useParams()
  const [collections, setCollection] = useAtom(collectionsAtom)
  const navigate = useNavigate()

  const collection = collectionId ? findCollection(collections, collectionId) : undefined
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
  }
  const subCollections = findSubCollections(collections, collectionId)

  return (
    <>
      <HeaderMenu />
      <Typography component="h2" variant="h4" gutterBottom>
        {collection.name}
      </Typography>
      {subCollections.length > 0 && (
        <>
          <Typography component="h3" variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
            Sub collections
          </Typography>
          <CollectionsGird collections={subCollections} displayWithParent />
        </>
      )}
      <Typography component="h3" variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Sets
      </Typography>
      <SetsTable collectionId={collectionId} sets={collection.sets} />
      <Typography component="h3" variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Details
      </Typography>
      <DeleteConfirm
        onConfirm={() => {
          setCollection({ action: CollectionReducerAction.DELETE_COLLECTION, collectionId })
          navigate('/')
        }}
        title={`Delete ${collection.name}`}
        message={`Are you sure you want to delete ${collection.name}?`}
      />
      <Box
        component="form"
        sx={{
          '& .MuiFormControl-root': { marginBottom: 4, width: '50ch' },
          '& .MuiTextField-root.number-field': { width: '100px' },
          'marginBottom': 20,
          'display': 'flex',
          'flexDirection': 'column',
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
              collection: { ...collection, name: e.target.value },
            })
          }}
        />
        <FormControl variant="standard">
          <InputLabel id="collection-icon">Icon</InputLabel>
          <Select
            labelId="collection-icon"
            id="collection-icon"
            value={collection.icon}
            label="Icon"
            onChange={(e) => {
              setCollection({
                action: CollectionReducerAction.UPDATE_COLLECTION,
                collection: { ...collection, icon: (e.target.value as ENABLED_ICON) },
              })
            }}
          >
            {Object.values(ENABLED_ICON).map(enabledIcon => (
              <MenuItem key={enabledIcon} value={enabledIcon}>
                <Icon iconName={enabledIcon} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="parentCollectionId">Parent collection</InputLabel>
          <Select
            labelId="parentCollectionId"
            id="parentCollectionId"
            value={collection.parentCollectionId || ''}
            label="parentCollectionId"
            onChange={(e) => {
              const parentCollectionId = e.target.value != 'default' ? e.target.value : undefined
              setCollection({
                action: CollectionReducerAction.UPDATE_COLLECTION,
                collection: { ...collection, parentCollectionId },
              })
            }}
          >
            {collections.filter(coll => !coll.parentCollectionId).map(coll => (
              <MenuItem key={coll.id} value={coll.id}>
                {coll.name}
              </MenuItem>
            ))}
            <MenuItem key="default" value="default">
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
              collection: { ...collection, link: e.target.value },
            })
          }}
        />
        <br />
        <FormControlLabel
          control={(
            <Switch
              checked={collection.aIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCollection({
                  action: CollectionReducerAction.UPDATE_COLLECTION,
                  collection: { ...collection, aIsLarge: e.target.checked },
                })
              }}
            />
          )}
          label="Value A large"
        />
        <FormControlLabel
          control={(
            <Switch
              checked={collection.bIsLarge}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCollection({
                  action: CollectionReducerAction.UPDATE_COLLECTION,
                  collection: { ...collection, bIsLarge: e.target.checked },
                })
              }}
            />
          )}
          label="Value B large"
        />
      </Box>
    </>
  )
}
