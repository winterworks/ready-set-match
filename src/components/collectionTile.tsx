import React from 'react'
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import Icon from './icon'
import { Link } from 'react-router-dom'
import { Collection } from 'src/types'
import { collectionsAtom } from 'src/data/collectionReducer'
import { useAtom } from 'jotai'
import { findSubCollections, getAllSubSets } from 'src/helpers/collectionHelpers'

interface Props {
  collection: Collection
}

export default function CollectionTile({ collection: { id, name, icon, sets } }: Props) {
  const [collections] = useAtom(collectionsAtom)
  const subCollections = findSubCollections(collections, id)
  const subsets = getAllSubSets(subCollections)

  return (
    <Grid key={name} item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography component="h3" variant="h5" display="flex" justifyContent="space-between">
            {name}
            {icon && (<Icon fontSize="large" iconName={icon} />)}
          </Typography>
          <Typography>
            Sets: {sets.length + subsets.length}
          </Typography>
        </CardContent>
        <CardActions sx={{
          justifyContent: 'space-between', height: 70,
          alignItems: 'flex-end',
        }}
        >
          <Link to={`/collection/${id}`}>
            <Button size="small" color="secondary">
              edit
            </Button>
          </Link>
          <Link to={`/practice/${id}`}>
            <Button size="small" color="primary" variant="contained">
              Practice
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}
