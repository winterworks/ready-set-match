import React from 'react';
import { Button, Grid, Link, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Category, Set } from "src/types";
import { useAtom } from "jotai";
import { categoryAtom, CategoryReducerAction } from 'src/data/categoryReducer';

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
  const [mistakes, setMistakes] = useState<{ [key: string]: number }>({})
  const [, dispatch] = useAtom(categoryAtom);

  useEffect(() => {
    if (selectedLeft !== undefined && selectedRight !== undefined) {
      // A set is selected
      if (selectedLeft === selectedRight) {
        // The set is correct
        setCorrectSets([...correctSets, selectedLeft]);
        setSelectedLeft(undefined);
        setSelectedRight(undefined);
      } else {
        // The set is wrong
        setMistakes({
          ...mistakes,
          [selectedLeft]: mistakes[selectedLeft] ? mistakes[selectedLeft] + 1 : 1,
          [selectedRight]: mistakes[selectedRight] ? mistakes[selectedRight] + 1 : 1,
        })
      }
    }

    if (correctSets.length === leftSets.length) {
      finishedPractice();
    }
  }, [correctSets, selectedLeft, selectedRight]);

  function finishedPractice() {
    leftSets.forEach(set => {
      const newMistakes = mistakes[set.id] || 0;
      const previousMistakes = set.mistakes || 0;
      const updatedSet = {
        ...set,
        practiced: set.practiced ? set.practiced + 1 : 1,
        mistakes: previousMistakes + newMistakes
      }
      dispatch({ action: CategoryReducerAction.UPDATE_SET, categoryId, updatedSet });
    });
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
      updateCurrent(undefined); // Unselect item
    } else {
      updateCurrent(id);
    }
  }

  function renderItem(
    id: number,
    text: string,
    onClick: (id: number) => void,
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
          onClick={!isCorrect ? () => onClick(id) : undefined}
          variant={variant}
          color={color}
          fullWidth
        >
          {text}
        </Button>
      </Grid>
    )
  }

  function renderItems() {
    const items: ReactNode[] = [];

    for (let index = 0; index < leftSets.length; index++) {
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
