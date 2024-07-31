import { Typography } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { practiceAtom } from "src/components/practiceOptionSelector";
import { stateAtom } from "src/data/state";
import { practiceOptions } from "src/helpers/setSorting";
import { shuffle } from "src/helpers/shuffle";

export default function Practice() {
  const { categoryId } = useParams();
  const [state] = useAtom(stateAtom);

  const size = 7;
  if (!categoryId) {
    return <>This category does not exit</>
  }

  const selectedCategory = state.categories[categoryId];
  if (!selectedCategory || selectedCategory.sets.length < size) {
    return <>Not enough sets</>
  }

  const [selectedOption] = useAtom(practiceAtom);
  const practiceOption = practiceOptions.find(({ id }) => id === selectedOption);

  if (!practiceOption) {
    return <>Practice option is not defined</>
  }

  // Sort by the selected practice option (sort type)
  const sortedSets = practiceOption.sort(selectedCategory.sets)

  // Select only a number of these least practiced sets
  const practiceSets = sortedSets.slice(0, size);

  // Split the sets in 2 shuffled collections
  const leftSets = shuffle(practiceSets);
  const rightSets = shuffle(practiceSets);

  return React.useMemo( () => (
    <>
      <Typography gutterBottom>
        Exercise: {practiceOptions.find(({ id }) => id === selectedOption)?.text }
      </Typography>
      <Matcher
        leftSets={leftSets}
        rightSets={rightSets}
        categoryId={categoryId}
        category={selectedCategory}
      />
    </>
  ), [] );
}