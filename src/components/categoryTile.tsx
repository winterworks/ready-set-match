import React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Category } from "src/types";
import { Link } from 'react-router-dom';
import { collectionsAtom } from 'src/data/collectionReducer';
import { useAtom } from 'jotai';

interface Props {
  category: Category;
}

export default function CategoryTile({ category: { name } }: Props) {
  const [collections] = useAtom(collectionsAtom);

  return (
    <Grid key={name} item xs={12}>
      <Card>
        <CardContent>
          <Typography component="h3" variant="h5" display="flex" justifyContent="space-between">
            {name}
          </Typography>
          {collections.filter(collection => collection.category === name).map((collection) =>
            <>{collection.name},</>
          )}
        </CardContent>
        <CardActions sx={{
          justifyContent: 'space-between'
        }}>
          <Link to={`/category/${name}`}>
            <Button size="small" color="secondary">
              edit
            </Button>
          </Link>
          {/* <Link to={`/practice/${name}`}>
            <Button size="small" color="primary" variant="contained">
              Practice
            </Button>
          </Link> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
