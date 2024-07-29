import Categories from "../components/categories";
import { data } from "../data/data";

export default function Root() {
  return (
    <Categories categories={data.categories} />
  );
}