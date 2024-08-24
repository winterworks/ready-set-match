import React from 'react';
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import CollectionTile from "src/components/collectionTile";
import PracticeSetSizeSelector from 'src/components/practiceSetSizeSelector';
import PracticeOptionSelector from 'src/components/practiceTypeSelector';
import MainMenu from 'src/components/mainMenu';
import CategoryTile from 'src/components/categoryTile';
import { collectionsAtom } from 'src/data/collectionReducer';
import { categoriesAtom } from 'src/data/categoryReducer';

export default function Index() {
  const [collections] = useAtom(collectionsAtom);
  const [categories] = useAtom(categoriesAtom);

  function renderCategories() {
    return categories.map((category) =>
      <CategoryTile key={category.name} category={category} />
    );
  }

  function renderCollections() {
    return collections.map((collection) =>
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
      {renderCategories()}
      {renderCollections()}
    </Grid>
  );
}