import React from 'react';
import { Grid, Link, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { practiceOptions } from "src/helpers/setSorting";
import { shuffle } from "src/helpers/shuffle";
import { setSizeAtom } from 'src/components/practiceSetSizeSelector';
import { practiceTypeAtom } from 'src/components/practiceTypeSelector';
import { categoryAtom } from 'src/data/categoryReducer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Practice() {
  const { categoryId } = useParams();
  const [getCategory] = useAtom(categoryAtom);
  const [setSizeOption] = useAtom(setSizeAtom);

  const category = categoryId ? getCategory(categoryId) : undefined;
  if (!categoryId || !category) {
    return <>This category does not exist</>
  }

  const [selectedOption] = useAtom(practiceTypeAtom);
  const practiceOption = practiceOptions.find(({ id }) => id === selectedOption);

  if (!practiceOption) {
    return <>Practice option is not defined</>
  }

  // Sort by the selected practice option (sort type)
  const sortedSets = practiceOption.sort(category.sets)

  // Select only a number of these least practiced sets
  const practiceSets = sortedSets.slice(0, setSizeOption);

  // Split the sets in 2 shuffled collections
  const leftSets = shuffle(practiceSets);
  const rightSets = shuffle(practiceSets);

  return React.useMemo(() => (
    <>
      <Typography component="h3" variant="h5" align="center">
        {category.name}
      </Typography>
      <Grid container xs={12}  justifyContent="space-between" sx={{ marginBottom: 4 }}>
        <Typography>
          Exercise: {practiceOptions.find(({ id }) => id === selectedOption)?.text}
        </Typography>
        <Link
          href={category.link}
          target="_blank"
          rel="noopener"
          align="center"
        >
          View more information
          <OpenInNewIcon fontSize="small" />
        </Link>
      </Grid>
      <Matcher
        leftSets={leftSets}
        rightSets={rightSets}
        categoryId={categoryId}
      />
    </>
  ), []);
}