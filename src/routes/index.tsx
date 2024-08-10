import React from 'react';
import { Button, Grid } from "@mui/material";
import { useAtom } from "jotai";
import CategoryTile from "src/components/categoryTile";
import { stateAtom } from "src/data/state";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';

export default function Root() {
  const [state] = useAtom(stateAtom);

  const categoryTiles = [];
  for (const [id, category] of Object.entries(state.categories)) {
    categoryTiles.push(<CategoryTile categoryId={id} category={category} />);
  };

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
    >
      <Grid item xs={12}>
        <PracticeOptionSelector />
        <PracticeSetSizeSelector />
      </Grid>
      {categoryTiles}
      <Grid item xs={12}>
        <Button href='/data'>
          Import / Export
        </Button>
      </Grid>
    </Grid>
  );
}