import { useAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { stateAtom } from "src/data/state";
import { shuffle } from "src/helpers/shuffle";

export default function Practice() {
  const { category: categoryId } = useParams();
  const [state] = useAtom(stateAtom);

  const size = 7;
  if (!categoryId) {
    return <>This category does not exit</>
  }

  const selectedCategory = state.categories[categoryId];
  if (!selectedCategory || selectedCategory.sets.length < size) {
    return <>Not enough sets</>
  }

  // Find the least practiced sets by sorting
  const sorted = selectedCategory.sets.sort(function(setA, setB) {
    const a = setA.practiced || 0;
    const b = setB.practiced || 0;

    // If the practiced count is the same sort randomly
    if (a === b) {
      return 0.5 - Math.random();
    }
    return a - b;
  });

  // Select only a number of these least practiced sets
  const sets = sorted.slice(0, size);

  const leftSets = shuffle(sets);
  const rightSets = shuffle(sets);

  return React.useMemo( () => (
    <Matcher
      leftSets={leftSets}
      rightSets={rightSets}
      categoryId={categoryId}
      category={selectedCategory}
    />
  ), [] );
}