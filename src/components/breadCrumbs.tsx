import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { collectionsAtom } from 'src/data/collectionReducer'
import { findCollection } from 'src/helpers/collectionHelpers'

interface Props {
  currentPageName?: string
}

export function BreadcrumbsPath({ currentPageName }: Props) {
  const { collectionId } = useParams()
  const [collections] = useAtom(collectionsAtom)

  const collection = collectionId ? findCollection(collections, collectionId) : undefined
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
