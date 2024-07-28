import Matcher from "@/components/matcher";
import { data } from "@/data/data";
import { shuffle } from "@/helpers/shuffle";

interface Props {
  params: { category: string }
  size?: number
}

export default function Home({ params, size = 7 }: Props) {
  const selectedCategory = data.categories.find(({ key }) => key === params.category);

  if (!selectedCategory || selectedCategory.sets.length < size) {
    return <>Not enough sets</>
  }

  const sets = shuffle(selectedCategory.sets).slice(0, size);

  return (
    <Matcher
      leftSets={shuffle(sets)}
      rightSets={shuffle(sets)}
    ></Matcher>
  );
}