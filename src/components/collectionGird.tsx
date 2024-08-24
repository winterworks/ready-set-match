import React from 'react';
import { Grid } from "@mui/material";
import { Collection } from 'src/types';
import CollectionTile from 'src/components/collectionTile';

interface Props {
  collections: Collection[];

  displayWithParent?: boolean;
}

export default function CollectionsGird({ collections, displayWithParent }: Props) {
  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
    >
      {collections.map((collection) => {
        if (!displayWithParent && collection.parentCollectionId) {
          return null;
        }
        return <CollectionTile key={collection.id} collection={collection} />
      })}
    </Grid>
  );
}
