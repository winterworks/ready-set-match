import { useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { data } from "src/data/data";
import { shuffle } from "src/helpers/shuffle";

export default function Practice() {
  const { category: categoryId } = useParams();

  const size = 7;
  if (!categoryId) {
    return <>This category does not exit</>
  }

  const selectedCategory = data.categories[categoryId];
  if (!selectedCategory || selectedCategory.sets.length < size) {
    return <>Not enough sets</>
  }
  const sorted = selectedCategory.sets.sort(function(a, b) {
    if (a.practiced && b.practiced) {
      return b.practiced - a.practiced;
    }
    return 0;
  });
  const sets = shuffle(sorted.slice(sorted.length - size, sorted.length));

  return (
    <Matcher
      leftSets={shuffle(sets)}
      rightSets={shuffle(sets)}
      categoryId={categoryId}
      category={selectedCategory}
    />
  );
}