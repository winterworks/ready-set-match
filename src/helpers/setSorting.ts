import { Set } from 'src/types'

export enum PracticeOption {
  LEAST = 'LEAST',
  MOST = 'MOST',
  RANDOM = 'RANDOM',
  WEAKEST = 'WEAKEST',
  STRONGEST = 'STRONGEST',
}

export interface PracticeElement {
  id: PracticeOption
  text: string
  sort: (sets: Set[]) => Set[]

  disabled?: boolean
}

function sortSetsBy(sets: Set[], attribute: 'practiced' | 'mistakes', ascending: boolean) {
  return sets.slice(0).sort((setA, setB) => {
    const a = setA[attribute] ?? 0
    const b = setB[attribute] ?? 0

    if (a === b) {
      return 0.5 - Math.random()
    }
    if (ascending) {
      return a - b
    }
    return b - a
  })
}

function sortLeastPracticed(sets: Set[]) {
  return sortSetsBy(sets, 'practiced', true)
}

function sortMostPracticed(sets: Set[]) {
  return sortSetsBy(sets, 'practiced', false)
}

function sortRandom(sets: Set[]) {
  // Use Durstenfeld algorithm to shuffle the array randomly
  const randomSets = sets.slice(0)
  for (let i = randomSets.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const set = sets[i]
    sets[i] = sets[randomIndex]
    sets[randomIndex] = set
  }
  return randomSets
}

function sortSetsBySkill(sets: Set[], ascending: boolean) {
  return sets.slice(0).sort((setA, setB) => {
    const aP = setA.practiced ?? 1
    const bP = setB.practiced ?? 1
    const aM = setA.mistakes ?? 0
    const bM = setB.mistakes ?? 0
    const a = aM / aP
    const b = bM / bP

    if (a === b) {
      return 0.5 - Math.random()
    }
    if (ascending) {
      return a - b
    }
    return b - a
  })
}

function sortWeakest(sets: Set[]) {
  return sortSetsBySkill(sets, false)
}

function sortStrongest(sets: Set[]) {
  return sortSetsBySkill(sets, true)
}

export const practiceOptions: PracticeElement[] = [
  { id: PracticeOption.WEAKEST, text: 'Weakest', sort: sortWeakest },
  { id: PracticeOption.STRONGEST, text: 'Strongest', sort: sortStrongest },
  { id: PracticeOption.RANDOM, text: 'Random', sort: sortRandom },
  { id: PracticeOption.LEAST, text: 'Least Practiced', sort: sortLeastPracticed },
  { id: PracticeOption.MOST, text: 'Most Practiced', sort: sortMostPracticed },
]
