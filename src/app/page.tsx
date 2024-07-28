import { data } from "@/data/data";
import Categories from "./components/categories";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Grid container spacing={3}>
      <Grid xs>
      </Grid>
      <Grid xs={6}>
        <Typography component="h1" variant="h2" gutterBottom>
          Ready Set Match
        </Typography>
        <Categories categories={data.categories} />
      </Grid>
      <Grid xs>
      </Grid>
    </Grid>
  );
}
