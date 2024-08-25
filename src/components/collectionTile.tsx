import React from 'react'
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import Icon from './icon'
import { Link } from 'react-router-dom'
import { Collection } from 'src/types'

interface Props {
  collection: Collection
}

export default function CollectionTile({ collection: { id, name, icon, sets } }: Props) {
  const totalPracticed = sets.reduce((acc, set) => {
    if (set.practiced) {
      return acc + set.practiced
    }
    return acc
  }, 0)

  return (
    <Grid key={name} item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography component="h3" variant="h5" display="flex" justifyContent="space-between">
            {name}
            {icon && (<Icon fontSize="large" iconName={icon} />)}
          </Typography>
          <Typography>
            Sets:
            {' '}
            {sets.length}
          </Typography>
          <Typography>
            Practiced:
            {' '}
            {totalPracticed}
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
