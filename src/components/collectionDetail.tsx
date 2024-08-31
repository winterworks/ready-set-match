import React from 'react'
import { Typography } from '@mui/material'
import SetsTable from 'src/components/setsTable'
import CollectionsGird from 'src/components/collectionGird'
import { Collection } from 'src/types'

interface Props {
  collection: Collection
  subCollections: Collection[]
}

export default function CollectionDetail({ collection, subCollections }: Props) {
  // TODO display detailed set information
  // const totalPracticed = sets.reduce((acc, set) => {
  //   if (set.practiced) {
  //     return acc + set.practiced
  //   }
  //   return acc
  // }, 0)

  return (
    <>
      {subCollections.length > 0 && (
        <CollectionsGird collections={subCollections} displayWithParent />
      )}
    </>
  )
}
