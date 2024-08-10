import React from 'react';
import { Button, Grid } from "@mui/material";
import { useAtom } from "jotai";
import CategoryTile from "src/components/categoryTile";
import { stateAtom } from "src/data/state";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';
import CategoryCreate from 'src/components/categoryCreate';

export default function Root() {
  const [state] = useAtom(stateAtom);

  function renderCategories() {
    const categoryTiles = [];
    for (const [id, category] of Object.entries(state.categories)) {
      categoryTiles.push(<CategoryTile categoryId={id} category={category} />);
    };
    return categoryTiles;
  }

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
    >
      <Grid container item xs={12} md={7} direction="row">
        <PracticeOptionSelector />
        <PracticeSetSizeSelector />
      </Grid>
      <Grid container item xs={12} md={5} justifyContent="flex-end">
        <Button href='/data' sx={{ marginRight: 1 }}>Import / Export</Button>
        <CategoryCreate/>
      </Grid>
      {renderCategories()}
    </Grid>
  );
}