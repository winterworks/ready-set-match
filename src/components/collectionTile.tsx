import React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Collection } from "src/types";
import Icon from "./icon";
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { categoriesAtom } from 'src/data/categoryReducer';

interface Props {
  collection: Collection;
}

export default function CollectionTile({ collection }: Props) {
  const [categories] = useAtom(categoriesAtom);

  const categoryName = categories.find(category => category.id === collection.category)?.name || null;
  const totalPracticed = collection.sets.reduce((acc, set) => {
    if (set.practiced) {
      return acc + set.practiced;
    }
    return acc;
  }, 0);

  return (
    <Grid key={collection.name} item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography component="h3" variant="h5" display="flex" justifyContent="space-between">
            {categoryName && `${categoryName}, `}{collection.name}{collection.icon && (<Icon fontSize="large" iconName={collection.icon} />)}
          </Typography>
          <Typography>
            Sets: {collection.sets.length}
          </Typography>
          <Typography>
            Practiced: {totalPracticed}
          </Typography>
        </CardContent>
        <CardActions sx={{
          justifyContent: 'space-between'
        }}>
          <Link to={`/collection/${collection.id}`}>
            <Button size="small" color="secondary">
              edit
            </Button>
          </Link>
          <Link to={`/practice/${collection.id}`}>
            <Button size="small" color="primary" variant="contained">
              Practice
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
