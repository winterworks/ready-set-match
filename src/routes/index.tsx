import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import CategoryTile from "src/components/categoryTile";
import PracticeOptionSelector from "src/components/practiceOptionSelector";
import { stateAtom } from "src/data/state";

export default function Root() {
  const [state] = useAtom(stateAtom);

  const categoryTiles = [];
  for(const [id, category] of Object.entries(state.categories)) {
    categoryTiles.push(<CategoryTile categoryId={id} category={category} />);
  };

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
    >
      <Grid item xs={12}>
        <PracticeOptionSelector />
      </Grid>
      {categoryTiles}
    </Grid>
  );
}