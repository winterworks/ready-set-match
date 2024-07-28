"use client";

import { Category, Set } from "@/types";
import { Button, Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  category: Category;
  leftSets: Set[];
  rightSets: Set[];
}

export default function Matcher({ category, leftSets, rightSets }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number>();
  const [selectedRight, setSelectedRight] = useState<number>();
  const [correctSets, setCorrectSets] = useState<number[]>([]);

  useEffect(() => {
    if (selectedLeft !== undefined && selectedLeft === selectedRight) {
      setCorrectSets([...correctSets, selectedLeft]);
      setSelectedLeft(undefined);
      setSelectedRight(undefined);
    }
  }, [correctSets, selectedLeft, selectedRight]);

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
    console.log(id, currentValue)
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

  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={4}
    >
      <Grid container item rowSpacing={2} xs={6} >
        {leftSets.map(({ id, a }) => renderItem(id, a, leftClicked, selectedLeft))}
      </Grid>
      <Grid container item rowSpacing={2} xs={6}>
        {rightSets.map(({ id, b }) => renderItem(id, b, rightClicked, selectedRight))}
      </Grid>
      <Grid container item rowSpacing={2} xs={12} justifyContent="center">
        <Grid container item rowSpacing={2} xs={12} justifyContent="space-between">
          <Button
            href={`/`}
            size="large"
            variant="contained"
          >
            Back
          </Button>
          {correctSets.length !== leftSets.length ? null : (
            <Typography component="h3" variant="h5" align="center" gutterBottom>
              All correct!
            </Typography>
          )}
          {correctSets.length !== leftSets.length ? <></> : (
            <Button
              href={`/practice/${category.key}`}
              size="large"
              variant="contained"
              color="success"
            >
              Again
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
