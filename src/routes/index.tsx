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
      <Grid item xs={12}>
        <PracticeOptionSelector />
        <PracticeSetSizeSelector />
        <CategoryCreate />
      </Grid>
      {renderCategories()}
      <Grid item xs={12}>
        <Button href='/data'>
          Import / Export
        </Button>
      </Grid>
    </Grid>
  );
}