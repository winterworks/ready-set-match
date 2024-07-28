"use client";

import { Set } from "@/types";
import { Button, Grid } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  sets: Set[];
}

export default function Matcher({ sets }: Props) {
  let leftItems: Set[] = [];
  let rightItems: Set[] = [];
  const [selectedLeft, setSelectedLeft] = useState<number>();
  const [selectedRight, setSelectedRight] = useState<number>();
  const [correctSets, setCorrectSets] = useState<number[]>([]);

  sets.forEach(set => {
    leftItems.push(set);
    rightItems.push(set);
  });

  useEffect(() => {
    if (selectedLeft && selectedLeft === selectedRight) {
      setCorrectSets([...correctSets, selectedLeft]);
      setSelectedLeft(undefined);
      setSelectedRight(undefined);
    }
  }, [correctSets, selectedLeft, selectedRight]);

  // TODO shuffle each column

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
        item
        container
        justifyContent="center"
      >
        <Button
          key={id}
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
    >
      <Grid container item rowSpacing={2} xs={6} >
        {leftItems.map(({ id, a }) => renderItem(id, a, leftClicked, selectedLeft))}
      </Grid>
      <Grid container item rowSpacing={2} xs={6}>
        {rightItems.map(({ id, b }) => renderItem(id, b, rightClicked, selectedRight))}
      </Grid>
    </Grid>
  );
}
