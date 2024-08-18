import React from 'react';
import { Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { Link, useParams } from "react-router-dom";
import Matcher from "src/components/matcher";
import { practiceOptions } from "src/helpers/setSorting";
import { practiceTypeAtom } from 'src/components/practiceTypeSelector';
import { collectionAtom } from 'src/data/collectionReducer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Practice() {
  const { collectionId } = useParams();
  const [getCollection] = useAtom(collectionAtom);

  const collection = collectionId ? getCollection(collectionId) : undefined;
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
  }

  const [selectedOption] = useAtom(practiceTypeAtom);
  const practiceOption = practiceOptions.find(({ id }) => id === selectedOption);

  if (!practiceOption) {
    return <>Practice option is not defined</>
  }

  return React.useMemo(() => (
    <>
      <Grid container item xs={12} justifyContent="space-between" sx={{ marginBottom: 4 }}>
        <Typography component="h3" variant="h5" align="center">
          {collection.name}
        </Typography>
        <Typography>
          Exercise: {practiceOptions.find(({ id }) => id === selectedOption)?.text}
        </Typography>
        {collection.link &&
          <Link
            to={collection.link}
            target="_blank"
            rel="noopener"
          >
            View more information
            <OpenInNewIcon fontSize="small" />
          </Link>
        }
      </Grid>
      <Matcher
        collectionId={collectionId}
        collection={collection}
        practiceOption={practiceOption}
      />
    </>
  ), []);
}