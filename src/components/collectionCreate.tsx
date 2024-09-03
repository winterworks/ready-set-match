import React, { useEffect, useState } from 'react'
import { Button, DialogContentText } from '@mui/material'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useAtom } from 'jotai'
import { collectionsAtom, CollectionReducerAction } from 'src/data/collectionReducer'
import { useParams } from 'react-router-dom'

interface Props {
  isOpen: boolean
  closeDialog: () => void
}

export default function CollectionCreate({ isOpen, closeDialog }: Props) {
  const { collectionId } = useParams()
  const [newCollectionName, setNewCollectionName] = React.useState('')
  const [collections, setCollection] = useAtom(collectionsAtom)
  const [nameIsTaken, setNameIsTaken] = useState<boolean>(false)

  useEffect(() => {
    setNameIsTaken(!!collections.find(({ name }) => name === newCollectionName))
  }, [collections, newCollectionName])

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCollectionName(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameIsTaken) {
      return
    }
    const newCollection = {
      name: newCollectionName,
      parentCollectionId: collectionId,
    }
    setCollection({ action: CollectionReducerAction.CREATE_COLLECTION, collection: newCollection })
    closeDialog()
  }

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        PaperProps={{
          component: 'form',
          onSubmit,
        }}
      >
        <DialogTitle>Create a new collection</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <TextField
            autoFocus
            required
            id="name"
            label="Collection name"
            type="text"
            fullWidth
            variant="standard"
            value={newCollectionName}
            onChange={onNameChanged}
          />
          {nameIsTaken && <DialogContentText>This name already exists: {newCollectionName}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
