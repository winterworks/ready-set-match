import Categories from "src/components/categories";
import { data } from "src/data/data";

export default function Root() {
  return (
    <Categories categories={data.categories} />
  );
}