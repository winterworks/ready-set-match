import Matcher from "@/components/matcher";
import { data } from "@/data/data";

interface Props {
  params: { category: string }
  size?: number
}

export default function Home({ params, size = 7 }: Props) {
  const selectedCategory = data.categories.find(({ key }) => key === params.category);

  if (!selectedCategory || selectedCategory.sets.length < size) {
    return <>Not enough sets</>
  }

  return (
    <Matcher sets={selectedCategory.sets.slice(0, size)}></Matcher>
  );
}