import React from 'react'
import { Grid } from '@mui/material'
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector'
import PracticeOptionSelector from 'src/components/practiceTypeSelector'
import MainMenu from 'src/components/mainMenu'
import { BreadcrumbsPath } from 'src/components/breadCrumbs'
import PracticeReverseToggle from 'src/components/practiceReverseToggle'
import { Collection } from 'src/types'

interface Props {
  collection?: Collection
  currentPageName?: string
  addCollectionDisabled?: boolean
}

export function HeaderMenu({ collection, currentPageName, addCollectionDisabled }: Props) {
  return (
    <>
      <Grid container display="flex" justifyContent="space-between" marginBottom={2}>
        <BreadcrumbsPath collection={collection} currentPageName={currentPageName} />
        <MainMenu addCollectionDisabled={addCollectionDisabled} />
      </Grid>
      <Grid container display="flex" flexWrap="wrap" rowGap={1} marginBottom={4}>
        <PracticeReverseToggle />
        <PracticeOptionSelector />
        <PracticeSetSizeSelector />
      </Grid>
    </>
  )
}
