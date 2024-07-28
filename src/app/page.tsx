import Categories from "@/components/categories";
import { data } from "@/data/data";

export default function Home() {
  return (
    <Categories categories={data.categories} />
  );
}
