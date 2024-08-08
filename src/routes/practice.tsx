import React from 'react';
import { Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { practiceOptions } from "src/helpers/setSorting";
import { shuffle } from "src/helpers/shuffle";
import { setSizeAtom } from 'src/components/practiceSetSizeSelector';
import { practiceTypeAtom } from 'src/components/practiceTypeSelector';
import { categoryAtom } from 'src/data/categoryReducer';

export default function Practice() {
  const { categoryId } = useParams();
  const [getCategory] = useAtom(categoryAtom);
  const [setSizeOption] = useAtom(setSizeAtom);

  if (!categoryId) {
    return <>This category does not exit</>
  }

  const selectedCategory = getCategory(categoryId);
  if (selectedCategory.sets.length < setSizeOption) {
    return <>Not enough sets</>
  }

  const [selectedOption] = useAtom(practiceTypeAtom);
  const practiceOption = practiceOptions.find(({ id }) => id === selectedOption);

  if (!practiceOption) {
    return <>Practice option is not defined</>
  }

  // Sort by the selected practice option (sort type)
  const sortedSets = practiceOption.sort(selectedCategory.sets)

  // Select only a number of these least practiced sets
  const practiceSets = sortedSets.slice(0, setSizeOption);

  // Split the sets in 2 shuffled collections
  const leftSets = shuffle(practiceSets);
  const rightSets = shuffle(practiceSets);

  return React.useMemo(() => (
    <>
      <Typography gutterBottom>
        Exercise: {practiceOptions.find(({ id }) => id === selectedOption)?.text}
      </Typography>
      <Matcher
        leftSets={leftSets}
        rightSets={rightSets}
        categoryId={categoryId}
        category={selectedCategory}
      />
    </>
  ), []);
}