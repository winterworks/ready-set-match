import React from 'react';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <>
      <Link to="/" >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Ready Set Match
        </Typography>
      </Link>
      <Divider sx={{ width: "100%", marginBottom: 4 }}/>
    </>
  )
}