import { useParams } from "react-router-dom";
import Matcher from "../components/matcher";
import { data } from "../data/data";
import { shuffle } from "../helpers/shuffle";

export default function Practice() {
  const { category } = useParams();
  const size = 7;
  const selectedCategory = data.categories.find(({ key }) => key === category);

  if (!selectedCategory || selectedCategory.sets.length < size) {
    return <>Not enough sets</>
  }

  const sets = shuffle(selectedCategory.sets).slice(0, size);

  return (
    <Matcher
      leftSets={shuffle(sets)}
      rightSets={shuffle(sets)}
      category={selectedCategory}
    />
  );
}