import React from 'react';
import { Button, Grid } from "@mui/material";
import { useAtom } from "jotai";
import CategoryTile from "src/components/categoryTile";
import { stateAtom } from "src/data/state";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';
import CategoryCreate from 'src/components/categoryCreate';
import { Link } from 'react-router-dom';

export default function Index() {
  const [state] = useAtom(stateAtom);

  function renderCategories() {
    const categoryTiles = [];
    for (const [id, category] of Object.entries(state.categories)) {
      categoryTiles.push(<CategoryTile key={id} categoryId={id} category={category} />);
    };
    return categoryTiles;
  }

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
    >
      <Grid container item xs={12} md={7} direction="row" rowGap={1}>
        <PracticeOptionSelector />
        <PracticeSetSizeSelector />
      </Grid>
      <Grid container item xs={12} md={5} justifyContent="flex-end">
        <Link to="/data">
          <Button sx={{ marginRight: 1 }}>Import / Export</Button>
        </Link>
        <div>
          <CategoryCreate/>
        </div>
      </Grid>
      {renderCategories()}
    </Grid>
  );
}