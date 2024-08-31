import React from 'react'
import { Typography } from '@mui/material'
import CollectionsGird from 'src/components/collectionGird'
import { Collection, Set } from 'src/types'
import { getAllSubSets } from 'src/helpers/collectionHelpers'

interface Props {
  collection: Collection
  subCollections: Collection[]
}

export default function CollectionDetail({ collection, subCollections }: Props) {
  const subSets = getAllSubSets(subCollections)

  const calculateTotalPracticed = (sets: Set[]) => {
    return sets.reduce((acc, set) => set.practiced ? acc + set.practiced : acc, 0)
  }

  const practicedCount = calculateTotalPracticed(collection.sets)
  const subPracticedCount = calculateTotalPracticed(subSets)
  const totalSets = collection.sets.length + subSets.length

  return (
    <>
      {subCollections.length > 0 && (
        <CollectionsGird collections={subCollections} displayWithParent />
      )}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Sets: {totalSets} ({subSets.length}) subsets)
      </Typography>
      <Typography variant="h6" gutterBottom>
        Practiced: {practicedCount} ({subPracticedCount} in subsets)
      </Typography>
    </>
  )
}
