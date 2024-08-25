import React from 'react'
import { Alert, Button, Grid, Snackbar } from '@mui/material'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Collection, Set } from 'src/types'
import { useAtom } from 'jotai'
import { setsAtom, SetReducerAction } from 'src/data/setReducer'
import { Link } from 'react-router-dom'
import { shuffle } from 'src/helpers/shuffle'
import { setSizeAtom } from 'src/components/practiceSetSizeSelector'
import { practiceOptions } from 'src/helpers/setSorting'
import { MatcherItem } from 'src/components/matcherItem'
import { practiceTypeAtom } from 'src/components/practiceTypeSelector'

interface Props {
  collectionId: string
  collection: Collection
}

export default function Matcher({ collectionId, collection }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string>()
  const [selectedRight, setSelectedRight] = useState<string>()
  const [correctSets, setCorrectSets] = useState<string[]>([])
  const [mistakes, setMistakes] = useState<Record<string, number>>({})
  const [, setSet] = useAtom(setsAtom)
  const [leftSets, setLeftSets] = useState<Set[]>([])
  const [rightSets, SetRightSets] = useState<Set[]>([])
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = React.useState(false)

  // Practice options
  const [setSizeOption] = useAtom(setSizeAtom)
  const [selectedOption] = useAtom(practiceTypeAtom)
  const practiceOption = practiceOptions.find(({ id }) => id === selectedOption)

  if (!practiceOption) {
    return <>Practice option is not defined</>
  }

  useEffect(() => {
    initSets()
  }, [])

  useEffect(() => {
    if (correctSets.length === setSizeOption) {
      setIsSuccessSnackbarOpen(true)
    }
  }, [correctSets, setSizeOption])

  useEffect(() => {
    if (selectedLeft !== undefined && selectedRight !== undefined) {
      // A set is selected
      if (selectedLeft === selectedRight) {
        // The set is correct
        setCorrectSets([...correctSets, selectedLeft])
        setSelectedLeft(undefined)
        setSelectedRight(undefined)
      }
      else {
        // The set is wrong
        setMistakes({
          ...mistakes,
          [selectedLeft]: mistakes[selectedLeft] ? mistakes[selectedLeft] + 1 : 1,
          [selectedRight]: mistakes[selectedRight] ? mistakes[selectedRight] + 1 : 1,
        })
      }
    }

    if (correctSets.length === leftSets.length) {
      finishedPractice()
    }
  }, [correctSets, selectedLeft, selectedRight])

  const backUrl = collection.parentCollectionId ? `/collection/${collection.parentCollectionId}` : '/'

  const initSets = () => {
    // Sort by the selected practice option (sort type)
    const sortedSets = practiceOption.sort(collection.sets)

    // Select only a number of these least practiced sets
    const practiceSets = sortedSets.slice(0, setSizeOption)

    // Split the sets in 2 shuffled collections
    setLeftSets(shuffle(practiceSets))
    SetRightSets(shuffle(practiceSets))
  }

  const resetAll = () => {
    setCorrectSets([])
    setMistakes({})
    initSets()
  }

  const resetSets = () => {
    setCorrectSets([])
    setMistakes({})

    setLeftSets(shuffle(leftSets))
    SetRightSets(shuffle(rightSets))
  }

  const finishedPractice = () => {
    leftSets.forEach((set) => {
      const newMistakes = mistakes[set.id] || 0
      const previousMistakes = set.mistakes ?? 0
      const updatedSet = {
        ...set,
        practiced: set.practiced ? set.practiced + 1 : 1,
        mistakes: previousMistakes + newMistakes,
      }
      setSet({ action: SetReducerAction.UPDATE_SET, collectionId, set: updatedSet })
    })
  }

  const leftClicked = (id: string) => {
    itemClicked(id, selectedLeft, setSelectedLeft)
  }

  const rightClicked = (id: string) => {
    itemClicked(id, selectedRight, setSelectedRight)
  }

  const itemClicked = (
    id: string,
    currentValue: string | undefined,
    updateCurrent: Dispatch<SetStateAction<string | undefined>>,
  ) => {
    if (id === currentValue) {
      updateCurrent(undefined) // Unselect item
    }
    else {
      updateCurrent(id)
    }
  }

  const renderItems = () => {
    const items: ReactNode[] = []

    for (let index = 0; index < leftSets.length; index++) {
      const leftId = leftSets[index].id
      const rightId = rightSets[index].id
      items.push(
        <Grid key={index} container item columnSpacing={4} xs={12}>
          <Grid container item xs={6} justifyContent="center">
            <MatcherItem
              id={leftId}
              text={leftSets[index].a}
              isCorrect={correctSets.includes(leftId)}
              selectedLeft={selectedLeft}
              selectedRight={selectedRight}
              isSelected={selectedLeft === leftId}
              isLarge={collection.aIsLarge}
              onClick={leftClicked}
            />
          </Grid>
          <Grid container item xs={6}>
            <MatcherItem
              id={rightId}
              text={rightSets[index].b}
              isCorrect={correctSets.includes(rightId)}
              selectedLeft={selectedLeft}
              selectedRight={selectedRight}
              isSelected={selectedRight === rightId}
              isLarge={collection.bIsLarge}
              onClick={rightClicked}
            />
          </Grid>
        </Grid>,
      )
    }

    return items
  }

  return (
    <Grid
      container
      rowSpacing={4}
    >
      {renderItems()}
      <Snackbar
        open={isSuccessSnackbarOpen}
        onClick={() => { setIsSuccessSnackbarOpen(false) }}
        onClose={() => { setIsSuccessSnackbarOpen(false) }}
        key="successSnackbar"
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          // onClose={handleClose}
          severity="success"
          variant="outlined"
          sx={{ width: '100%' }}
        >
          You got all sets matched correctly!
        </Alert>
      </Snackbar>
      <Grid container item xs={12} justifyContent="space-between">
        <Link to={backUrl}>
          <Button size="large" variant="contained">
            Back
          </Button>
        </Link>
        {correctSets.length === leftSets.length && (
          <div>
            <Button size="large" variant="outlined" color="success" onClick={resetSets} sx={{ marginRight: 2 }}>
              Again
            </Button>
            <Button size="large" variant="contained" color="success" onClick={resetAll}>
              New sets
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  )
}
