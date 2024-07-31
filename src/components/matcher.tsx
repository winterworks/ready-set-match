import { Button, Grid, Link, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Category, Set } from "src/types";
import { useAtom } from "jotai";
import { stateAtom } from "src/data/state"

interface Props {
  categoryId: string;
  category: Category;
  leftSets: Set[];
  rightSets: Set[];
}

export default function Matcher({ categoryId, category, leftSets, rightSets }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number>();
  const [selectedRight, setSelectedRight] = useState<number>();
  const [correctSets, setCorrectSets] = useState<number[]>([]);
  const [state, setState] = useAtom(stateAtom);

  useEffect(() => {
    if (selectedLeft !== undefined && selectedLeft === selectedRight) {
      setCorrectSets([...correctSets, selectedLeft]);
      setSelectedLeft(undefined);
      setSelectedRight(undefined);
    }

    if(correctSets.length === leftSets.length) {
      finishedPractice();
    }
  }, [correctSets, selectedLeft, selectedRight]);

  function finishedPractice() {
    const updatedSets = category.sets.map(
      set => correctSets.includes(set.id)
        ? { ...set, practiced: set.practiced ? set.practiced + 1 : 1 }
        : set
    );

    const newState = {
      ...state,
      categories: {
        ...state.categories,
        [categoryId]: {
          ...category,
          sets: updatedSets
        }
      }
    }
    setState(newState);
  }

  function leftClicked(id: number) {
    itemClicked(id, selectedLeft, setSelectedLeft);
  }

  function rightClicked(id: number) {
    itemClicked(id, selectedRight, setSelectedRight);
  }

  function itemClicked(
    id: number,
    currentValue: number | undefined,
    updateCurrent: Dispatch<SetStateAction<number | undefined>>
) {
    if (id === currentValue) {
      updateCurrent(undefined);
    } else {
      updateCurrent(id);
    }
  }

  function renderItem(
    id: number,
    text: string,
    itemClicked: (id: number) => void,
    selectedId?: number
  ) {
    const isSelected = id === selectedId;
    const isCorrect = correctSets.includes(id);
    const isWrong = isSelected
      && selectedLeft !== undefined
      && selectedRight !== undefined
      && selectedLeft !== selectedRight;

    const variant = isSelected || isCorrect ? 'contained' : 'outlined'
    const color = (isCorrect ? "success" : undefined) || (isWrong ? "error" : undefined)

    return (
      <Grid
        key={id}
        item
        container
        justifyContent="center"
      >
        <Button
          size="large"
          onClick={!isCorrect ? () => itemClicked(id) : undefined}
          variant={variant}
          color={color}
          fullWidth
        >
          {text}
        </Button>
      </Grid>
    )
  }

  function renderItems () {
    const items: ReactNode[] = [];

    for(let index = 0; index < leftSets.length; index++) {
      items.push(
        <Grid key={index} container item columnSpacing={8} xs={12} >
          <Grid container item xs={6}>
            {renderItem(leftSets[index].id, leftSets[index].a, leftClicked, selectedLeft)}
          </Grid>
          <Grid container item xs={6}>
            {renderItem(rightSets[index].id, rightSets[index].b, rightClicked, selectedRight)}
          </Grid>
        </Grid>
      )
    }

    return items;
  }

  function renderInfo() {
    return (
      <Grid container item xs={12} direction="column">
        <Typography component="h3" variant="h5" align="center">
          Practicing: {category.name}
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
    )
  }

  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={4}
    >
      {renderItems()}
      {renderInfo()}
      <Grid container item xs={12} justifyContent="space-between">
        <Button
          href={`/`}
          size="large"
          variant="contained"
        >
          Back
        </Button>
        {correctSets.length === leftSets.length && (
          <Typography component="h3" variant="h5" align="center" gutterBottom>
            All correct!
          </Typography>
        )}
        {correctSets.length !== leftSets.length ? <></> : (
          <Button
            href={`/practice/${categoryId}`}
            size="large"
            variant="contained"
            color="success"
          >
            Again
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
