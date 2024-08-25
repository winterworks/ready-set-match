import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { Link, useParams } from 'react-router-dom'
import Matcher from 'src/components/matcher'
import { collectionsAtom } from 'src/data/collectionReducer'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { findCollection } from 'src/helpers/collectionHelpers'

export default function Practice() {
  const { collectionId } = useParams()
  const [collections] = useAtom(collectionsAtom)

  const collection = collectionId ? findCollection(collections, collectionId) : undefined
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
  }

  return React.useMemo(() => (
    <>
      <Grid container item xs={12} justifyContent="space-between" sx={{ marginBottom: 4 }}>
        <Typography component="h3" variant="h5" align="center">
          {collection.name}
        </Typography>
        {collection.link
        && (
          <Link
            to={collection.link}
            target="_blank"
            rel="noopener"
          >
            View more information
            <OpenInNewIcon fontSize="small" />
          </Link>
        )}
      </Grid>
      <Matcher collection={collection} />
    </>
  ), [])
}
