import React from 'react'
import { Divider, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <>
      <Grid container item justifyContent="center" columnGap={2} sx={{ marginTop: 1 }}>
        <Grid item alignContent="center">
          <Link to="/">
            <img src="/images/icon.svg" width="50px" />
          </Link>
        </Grid>
        <Grid alignContent="center">
          <Link to="/">
            <Typography component="h1" variant="h2" alignContent="center">
              Ready Set Match
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Divider sx={{ width: '100%', marginBottom: 4 }} />
    </>
  )
}
