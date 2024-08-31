import React from 'react'
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import Icon, { ENABLED_ICON } from 'src/components/icon'
import { collectionsAtom, CollectionReducerAction } from 'src/data/collectionReducer'
import DeleteConfirm from 'src/components/deleteConfirm'
import { HeaderMenu } from 'src/components/headerMenu'
import { Collection } from 'src/types'

interface Props {
  collection: Collection
}

export default function CollectionEdit({ collection }: Props) {
  const [collections, setCollection] = useAtom(collectionsAtom)
  const navigate = useNavigate()

  const onDeleteConfirmed = () => {
    setCollection({ action: CollectionReducerAction.DELETE_COLLECTION, collectionId: collection.id })
    navigate('/')
  }

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collection: { ...collection, name: e.target.value },
    })
  }

  const onIconChanged = (e: SelectChangeEvent<string>) => {
    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collection: { ...collection, icon: (e.target.value as ENABLED_ICON) },
    })
  }

  const onParentChanged = (e: SelectChangeEvent<string>) => {
    const parentCollectionId = e.target.value != 'default' ? e.target.value : undefined
    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collection: { ...collection, parentCollectionId },
    })
  }

  const onLinkChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collection: { ...collection, link: e.target.value },
    })
  }

  const onASizeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collection: { ...collection, aIsLarge: e.target.checked },
    })
  }

  const onBSizeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollection({
      action: CollectionReducerAction.UPDATE_COLLECTION,
      collection: { ...collection, bIsLarge: e.target.checked },
    })
  }

  return (
    <>
      <DeleteConfirm
        onConfirm={onDeleteConfirmed}
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
          onChange={onNameChanged}
        />
        <FormControl variant="standard">
          <InputLabel id="collection-icon">Icon</InputLabel>
          <Select
            labelId="collection-icon"
            id="collection-icon"
            value={collection.icon}
            label="Icon"
            MenuProps={{ disableScrollLock: true }}
            onChange={onIconChanged}
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
            MenuProps={{ disableScrollLock: true }}
            onChange={onParentChanged}
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
          onChange={onLinkChanged}
        />
        <br />
        <FormControlLabel
          control={
            <Switch
              checked={collection.aIsLarge}
              onChange={onASizeChanged}
            />
          }
          label="Value A large"
        />
        <FormControlLabel
          control={
            <Switch
              checked={collection.bIsLarge}
              onChange={onBSizeChanged}
            />
          }
          label="Value B large"
        />
      </Box>
    </>
  )
}
