import React from 'react'
import { Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import Matcher from 'src/components/matcher'
import { collectionsAtom } from 'src/data/collectionReducer'
import { findCollection } from 'src/helpers/collectionHelpers'
import { HeaderMenu } from 'src/components/headerMenu'

export default function Practice() {
  const { collectionId } = useParams()
  const [collections] = useAtom(collectionsAtom)

  const collection = collectionId ? findCollection(collections, collectionId) : undefined
  if (!collection) {
    return <>This collection does not exist</>
  }

  return (
    <>
      <Grid container item xs={12} justifyContent="space-between">
        <HeaderMenu collection={collection} currentPageName="Practice" menuDisabled />
        {/* Disable link to find a better way to display it */}
        {/* {collection.link && (
          <Link
            to={collection.link}
            target="_blank"
            rel="noopener"
          >
            View more information
            <OpenInNewIcon fontSize="small" />
          </Link>
        )} */}
      </Grid>
      <Matcher collection={collection} />
    </>
  )
}
