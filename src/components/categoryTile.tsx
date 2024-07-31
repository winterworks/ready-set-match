import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { Category } from "src/types";
import Icon from "./icon";

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
        <CardActionArea href={`/practice/${categoryId}`}>
          <CardContent>
            {icon && (<Icon iconName={icon}/>)}
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography>
              Sets practiced: {totalPracticed}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
