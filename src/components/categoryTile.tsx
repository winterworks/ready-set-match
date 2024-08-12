import React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Category } from "src/types";
import Icon from "./icon";
import { Link } from 'react-router-dom';

interface Props {
  categoryId: string;
  category: Category;
}

export default function CategoryTile({ categoryId, category: { name, icon, sets } }: Props) {
  const totalPracticed = sets.reduce((acc, set) => {
    if (set.practiced) {
      return acc + set.practiced;
    }
    return acc;
  }, 0);

  return (
    <Grid key={name} item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography component="h3" variant="h5" display="flex" justifyContent="space-between">
            {name}{icon && (<Icon fontSize="large" iconName={icon} />)}
          </Typography>
          <Typography>
            Sets: {sets.length}
          </Typography>
          <Typography>
            Practiced: {totalPracticed}
          </Typography>
        </CardContent>
        <CardActions sx={{
          justifyContent: 'space-between'
        }}>
          <Link to={`/category/${categoryId}`}>
            <Button size="small" color="secondary">
              edit
            </Button>
          </Link>
          <Link to={`/practice/${categoryId}`}>
            <Button size="small" color="primary" variant="contained">
              Practice
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
