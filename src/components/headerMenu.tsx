import React from 'react'
import { Grid } from '@mui/material'
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector'
import PracticeOptionSelector from 'src/components/practiceTypeSelector'
import MainMenu from 'src/components/mainMenu'
import { BreadcrumbsPath } from 'src/components/breadCrumbs'
import PracticeReverseToggle from 'src/components/practiceReverseToggle'

interface Props {
  currentPageName?: string
  menuDisabled?: boolean
}

export function HeaderMenu({ currentPageName, menuDisabled }: Props) {
  return (
    <Grid container item xs={12} marginBottom={4} flexDirection="row" display="flex" justifyContent="space-between" alignContent="center">
      <BreadcrumbsPath currentPageName={currentPageName} />
      <Grid item display="flex">
        <PracticeReverseToggle />
        <PracticeOptionSelector />
        <PracticeSetSizeSelector />
        <MainMenu disabled={menuDisabled} />
      </Grid>
    </Grid>
  )
}
