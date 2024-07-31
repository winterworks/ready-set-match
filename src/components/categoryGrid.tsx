import { Grid } from "@mui/material";
import CategoryTile from "src/components/categoryTile";
import { Category } from "src/types";

interface Props {
  categories: { [key: string]: Category };
}

export default function Categories({ categories }: Props) {
  function renderCategories() {
    const categoryElements = [];
    for(const [id, category] of Object.entries(categories)) {
      categoryElements.push(<CategoryTile categoryId={id} category={category} />);
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
