import React from 'react';
import { Grid } from "@mui/material";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';
import MainMenu from 'src/components/mainMenu';

export function HeaderMenu() {
  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
      marginBottom={4}
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
    </Grid>
  );
}