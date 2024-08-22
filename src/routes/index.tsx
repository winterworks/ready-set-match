import React from 'react';
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import CollectionTile from "src/components/collectionTile";
import { stateAtom } from "src/data/state";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';
import MainMenu from 'src/components/mainMenu';

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
        <div>
          <MainMenu />
        </div>
      </Grid>
      {renderCollections()}
    </Grid>
  );
}