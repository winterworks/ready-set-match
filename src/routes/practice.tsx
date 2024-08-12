import React from 'react';
import { Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { Link, useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { practiceOptions } from "src/helpers/setSorting";
import { practiceTypeAtom } from 'src/components/practiceTypeSelector';
import { categoryAtom } from 'src/data/categoryReducer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Practice() {
  const { categoryId } = useParams();
  const [getCategory] = useAtom(categoryAtom);

  const category = categoryId ? getCategory(categoryId) : undefined;
  if (!categoryId || !category) {
    return <>This category does not exist</>
  }

  const [selectedOption] = useAtom(practiceTypeAtom);
  const practiceOption = practiceOptions.find(({ id }) => id === selectedOption);

  if (!practiceOption) {
    return <>Practice option is not defined</>
  }

  return React.useMemo(() => (
    <>
      <Typography component="h3" variant="h5" align="center">
        {category.name}
      </Typography>
      <Grid container xs={12}  justifyContent="space-between" sx={{ marginBottom: 4 }}>
        <Typography>
          Exercise: {practiceOptions.find(({ id }) => id === selectedOption)?.text}
        </Typography>
        {category.link &&
          <Link
            to={category.link}
            target="_blank"
            rel="noopener"
          >
            View more information
            <OpenInNewIcon fontSize="small" />
          </Link>
        }
      </Grid>
      <Matcher
        categoryId={categoryId}
        category={category}
        practiceOption={practiceOption}
      />
    </>
  ), []);
}