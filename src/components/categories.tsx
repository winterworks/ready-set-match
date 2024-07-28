import { Card, CardActionArea, CardContent, Container, Stack, Typography } from "@mui/material";
import { Category } from "../types";
import { Checklist, MoreHoriz, Science, Translate } from '@mui/icons-material';

interface Props {
  categories: Category[];
}

export default function Categories({categories}: Props) {
  function renderCategory(category: Category) {
    let Icon = Checklist;

    switch (category.icon) {
      case "Science":
        Icon = Science;
        break;
      case "Translate":
        Icon = Translate;
        break;
      case "MoreHoriz":
        Icon = MoreHoriz;
        break;
      default:
        break;
    }

    return (
      <Container key={category.name}>
        <Card>
          <CardActionArea href={`/practice/${category.key}`}>
            <CardContent>
              <Icon />
              <Typography gutterBottom variant="h6" component="div">
                {category.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    )
  }

  return (
    <Stack direction="row" spacing={2}>
      {categories.map(renderCategory)}
    </Stack>
  );
}
