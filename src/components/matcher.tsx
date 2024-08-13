import React from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Category, Set } from "src/types";
import { useAtom } from "jotai";
import { setsAtom, SetReducerAction } from 'src/data/setReducer';
import { Link } from 'react-router-dom';
import { shuffle } from "src/helpers/shuffle";
import { setSizeAtom } from 'src/components/practiceSetSizeSelector';
import { PracticeElement } from 'src/helpers/setSorting';

interface Props {
  categoryId: string;
  category: Category;
  practiceOption: PracticeElement;
}

interface MatchItemProps {
  id: string;
  text: string;
  correctSets: string[];

  selectedLeft?: string;
  selectedRight?: string;
  selectedId?: string;
  isLarge?: boolean;

  onClick: (id: string) => void;
}

function MatchItem({ id, text, selectedId, correctSets, selectedLeft, selectedRight, isLarge, onClick}: MatchItemProps) {
  const isSelected = id === selectedId;
  const isCorrect = correctSets.includes(id);
  const isWrong = isSelected
    && selectedLeft !== undefined
    && selectedRight !== undefined
    && selectedLeft !== selectedRight;

  const variant = isSelected || isCorrect ? 'contained' : 'outlined';
  const color = (isCorrect ? "success" : undefined) ?? (isWrong ? "error" : undefined);

  return (
    <Button
      size="large"
      onClick={!isCorrect ? () => { onClick(id); } : undefined}
      variant={variant}
      color={color}
      fullWidth
      sx={{ ml:6, textTransform: 'none', marginLeft: 0 }}
    >
      {isLarge
        ? <span style={{ fontSize: 35, lineHeight: 1 }}>{text}</span>
        : text
      }
    </Button>
  );
}

export default function Matcher({ categoryId, category, practiceOption }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string>();
  const [selectedRight, setSelectedRight] = useState<string>();
  const [correctSets, setCorrectSets] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<Record<string, number>>({});
  const [setSizeOption] = useAtom(setSizeAtom);
  const [, setSet] = useAtom(setsAtom);
  const [leftSets, setLeftSets] = useState<Set[]>([]);
  const [rightSets, SetRightSets] = useState<Set[]>([]);

  useEffect(() => {
    initSets();
  }, []);

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


  function initSets() {
    // Sort by the selected practice option (sort type)
    const sortedSets = practiceOption.sort(category.sets)

    // Select only a number of these least practiced sets
    const practiceSets = sortedSets.slice(0, setSizeOption);

    // Split the sets in 2 shuffled collections
    setLeftSets(shuffle(practiceSets));
    SetRightSets(shuffle(practiceSets));
  }

  function resetAll() {
    setCorrectSets([]);
    setMistakes({});
    initSets();
  }

  function finishedPractice() {
    leftSets.forEach(set => {
      const newMistakes = mistakes[set.id] || 0;
      const previousMistakes = set.mistakes ?? 0;
      const updatedSet = {
        ...set,
        practiced: set.practiced ? set.practiced + 1 : 1,
        mistakes: previousMistakes + newMistakes
      };
      setSet({ action: SetReducerAction.UPDATE_SET, categoryId, set: updatedSet });
    });
  }

  function leftClicked(id: string) {
    itemClicked(id, selectedLeft, setSelectedLeft);
  }

  function rightClicked(id: string) {
    itemClicked(id, selectedRight, setSelectedRight);
  }

  function itemClicked(
    id: string,
    currentValue: string | undefined,
    updateCurrent: Dispatch<SetStateAction<string | undefined>>
  ) {
    if (id === currentValue) {
      updateCurrent(undefined); // Unselect item
    } else {
      updateCurrent(id);
    }
  }

  function renderItems() {
    const items: ReactNode[] = [];

    for (let index = 0; index < leftSets.length; index++) {
      items.push(
        <Grid key={index} container item columnSpacing={4} xs={12} >
          <Grid container item xs={6} justifyContent="center">
            <MatchItem
              id={leftSets[index].id}
              text={leftSets[index].a}
              correctSets={correctSets}
              selectedLeft={selectedLeft}
              selectedRight={selectedRight}
              selectedId={selectedLeft}
              isLarge={category.aIsLarge}
              onClick={leftClicked}
            />
          </Grid>
          <Grid container item xs={6}>
            <MatchItem
              id={rightSets[index].id}
              text={rightSets[index].b}
              correctSets={correctSets}
              selectedLeft={selectedLeft}
              selectedRight={selectedRight}
              selectedId={selectedRight}
              isLarge={category.bIsLarge}
              onClick={rightClicked}
            />
          </Grid>
        </Grid>
      )
    }

    return items;
  }

  return (
    <Grid
      container
      rowSpacing={4}
    >
      {renderItems()}
      <Grid container item xs={12} justifyContent="space-between">
        <Link to="/">
          <Button size="large" variant="contained">
            Back
          </Button>
        </Link>
        {correctSets.length === leftSets.length && (
          <Typography component="h3" variant="h5" align="center" gutterBottom>
            All correct!
          </Typography>
        )}
        {correctSets.length !== leftSets.length ? <></> : (
          <Button size="large" variant="contained" color="success" onClick={resetAll}>
            Again
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
