import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { collectionsAtom } from 'src/data/collectionReducer'
import { findCollection } from 'src/helpers/collectionHelpers'
import { Collection } from 'src/types'

interface Props {
  collection?: Collection
  currentPageName?: string
}

export function BreadcrumbsPath({ collection, currentPageName }: Props) {
  const [collections] = useAtom(collectionsAtom)
  const parentCollection = collection?.parentCollectionId ? findCollection(collections, collection.parentCollectionId) : undefined

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ display: 'flex', verticalAlign: 'middle' }}>
      <Link to="/">
        Home
      </Link>
      {parentCollection && (
        <Link to={`/collection/${parentCollection.id}`}>
          {parentCollection.name}
        </Link>
      )}
      {collection && (
        <Link to={`/collection/${collection.id}`}>
          {collection.name}
        </Link>
      )}
      {currentPageName && (
        <Typography color="text.primary">{currentPageName}</Typography>
      )}
    </Breadcrumbs>
  )
}
