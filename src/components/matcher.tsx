import React from 'react'
import { Alert, Box, Button, CircularProgress, Grid, Snackbar } from '@mui/material'
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
import { findSubCollections } from 'src/helpers/collectionHelpers'
import { collectionsAtom } from 'src/data/collectionReducer'
import { setReverseAtom } from 'src/components/practiceReverseToggle'

interface Props {
  collection: Collection
}

interface PracticeSet extends Set {
  collectionId?: string
}

export default function Matcher({ collection }: Props) {
  const [, setSet] = useAtom(setsAtom)
  const [collections] = useAtom(collectionsAtom)

  // Component states
  const [leftSets, setLeftSets] = useState<PracticeSet[]>([])
  const [rightSets, SetRightSets] = useState<PracticeSet[]>([])

  const [selectedLeft, setSelectedLeft] = useState<string>()
  const [selectedRight, setSelectedRight] = useState<string>()

  const [correctSets, setCorrectSets] = useState<string[]>([])
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = React.useState(false)
  const [mistakes, setMistakes] = useState<Record<string, number>>({})

  const [isLoading, setLoading] = useState<boolean>(true)

  // Practice options
  const [setSizeOption] = useAtom(setSizeAtom)
  const [selectedOption] = useAtom(practiceTypeAtom)
  const [reversed] = useAtom(setReverseAtom)

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

  const getPracticeSets = (collection: Collection): PracticeSet[] => {
    return collection.sets.map(set => ({ ...set, collectionId: collection.id }))
  }

  const initSets = () => {
    // Find the selected practice option or default to the first one
    const practiceOption = practiceOptions.find(({ id }) => id === selectedOption) || practiceOptions[0]

    const subCollections = findSubCollections(collections, collection.id)
    const subSets = subCollections.reduce<PracticeSet[]>((acc, subCollection) => [...acc, ...getPracticeSets(subCollection)], [])
    const sets: PracticeSet[] = [...getPracticeSets(collection), ...subSets]

    // Sort by the selected practice option (sort type)
    const sortedSets = practiceOption.sort(sets)

    // Select only a number of these least practiced sets
    const practiceSets = sortedSets.slice(0, setSizeOption) as PracticeSet[]

    // Split the sets in 2 shuffled collections
    setLeftSets(shuffle(practiceSets))
    SetRightSets(shuffle(practiceSets))
    setLoading(false)
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

      const collectionId = updatedSet.collectionId || collection.id
      delete updatedSet.collectionId

      setSet({ action: SetReducerAction.UPDATE_SET, collectionId, set: updatedSet })
    })
  }

  const leftClicked = (id: string) => {
    itemClicked(id, selectedLeft, setSelectedLeft)
  }

  const rightClicked = (id: string) => {
    itemClicked(id, selectedRight, setSelectedRight)
  }

  const closeSuccessSnackbar = () => {
    setIsSuccessSnackbarOpen(false)
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
        <Grid key={index} container item columnSpacing={4} xs={12} direction={reversed ? 'row-reverse' : undefined}>
          <Grid item xs={6} justifyContent="center">
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
          <Grid item xs={6}>
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

  if (isLoading) {
    return (
      <Grid container item xs={12} justifyContent="center">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Grid>
    )
  }

  return (
    <Grid
      container
      rowSpacing={4}
    >
      {renderItems()}
      <Snackbar
        open={isSuccessSnackbarOpen}
        onClick={closeSuccessSnackbar}
        onClose={closeSuccessSnackbar}
        key="successSnackbar"
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSuccessSnackbar}
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
