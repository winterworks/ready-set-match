import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import { Category } from "src/types";
import Icon from "./icon";

interface Props {
  categories: Category[];
}

export default function Categories({categories}: Props) {
  function renderCategory({ key, name, icon }: Category) {
    return (
      <Grid key={name} item xs={12} sm={6} md={4}>
        <Container key={name}>
          <Card>
            <CardActionArea href={`/practice/${key}`}>
              <CardContent>
                {icon && (<Icon iconName={icon}/>)}
                <Typography gutterBottom variant="h6" component="div">
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
      </Grid>
    );
  }

  return (
    <Grid
      container
      rowSpacing={4}
    >
      {categories.map(renderCategory)}
    </Grid>
  );
}
