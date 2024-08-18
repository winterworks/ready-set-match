import React from 'react';
import { Button, Grid } from "@mui/material";
import { useAtom } from "jotai";
import CollectionTile from "src/components/collectionTile";
import { stateAtom } from "src/data/state";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';
import CollectionCreate from 'src/components/collectionCreate';
import { Link } from 'react-router-dom';

export default function Index() {
  const [state] = useAtom(stateAtom);

  function renderCollections() {
    return state.collections.map((collection) =>
      <CollectionTile key={collection.name} collection={collection} />
    );
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
          <CollectionCreate/>
        </div>
      </Grid>
      {renderCollections()}
    </Grid>
  );
}