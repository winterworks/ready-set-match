import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import { Category } from "src/types";
import Icon from "./icon";
import { data } from "src/data/data";

interface Props {}

export default function Categories({}: Props) {
  function renderCategory(id: string, { name, icon }: Category) {
    return (
      <Grid key={name} item xs={12} sm={6} md={4}>
        <Container key={name}>
          <Card>
            <CardActionArea href={`/practice/${id}`}>
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

  function renderCategories() {
    const categoryElements = [];
    for(const [id, category] of Object.entries(data.categories)) {
      categoryElements.push(renderCategory(id, category));
    };
    return categoryElements;
  }

  return (
    <Grid
      container
      rowSpacing={4}
    >
      {renderCategories()}
    </Grid>
  );
}
