import { Button, ButtonGroup } from "@mui/material";
import { Category } from "../types";

interface Props {
  categories: Category[];
}

export default function Categories({categories}: Props) {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      {categories.map(category =>
        <Button
          href={`/practice/${category.key}`}
          key={category.name}
        >{category.name}</Button>
      )}
    </ButtonGroup>
  );
}
