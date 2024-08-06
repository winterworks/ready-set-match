import React, { useState } from 'react';
import { Button, Grid, TextField } from "@mui/material";
import { NewSet } from 'src/data/categoryReducer';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
  onSetAdded: (set: NewSet) => void;
}

export default function SetAddForm({ onSetAdded }: Props) {
  const [newA, setNewA] = useState<string>('');
  const [newB, setNewB] = useState<string>('');

  function addSet() {
    if (newA === undefined || newB === undefined) {
      return;
    }
    onSetAdded({ a: newA, b: newB });
    setNewA('');
    setNewB('');
    console.log(newA)
  }

  return (
    <Grid container spacing={2} >
      <Grid xs={12} item >
        <TextField id="new-a" label="Side A" variant="standard" value={newA}
          onChange={(e) => setNewA(e.target.value)}
        />
        <TextField id="new-b" label="Side B" variant="standard" value={newB}
          onChange={(e) => setNewB(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <Button size="small" color="primary" variant="contained" onClick={addSet} startIcon={<ArrowDownwardIcon />} >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}