import { Set } from "src/types";

export enum PracticeOption {
  LEAST = "LEAST",
  MOST = "MOST",
  RANDOM = "RANDOM",
  WEAKEST = "WEAKEST",
  STRONGEST = "STRONGEST"
}

export interface PracticeElement {
  id: PracticeOption;
  text: string;
  sort: (sets: Set[]) => Set[]

  disabled?: boolean;
}

function sortByPracticed(sets: Set[], sortByLeast: boolean) {
  return sets.slice(0).sort((setA, setB) => {
    const a = setA.practiced || 0;
    const b = setB.practiced || 0;

    if (a === b) {
      return 0.5 - Math.random();
    }
    if (sortByLeast) {
      return a - b;
    }
    return b - a;
  });
}

function sortLeastPracticed(sets: Set[]) {
  return sortByPracticed(sets, true);
}

function sortMostPracticed(sets: Set[]) {
  return sortByPracticed(sets, false);
}

function sortRandom(sets: Set[]) {
  return sets.slice(0).sort(() => 0.5 - Math.random());
}

export const practiceOptions: PracticeElement[] = [
  { id: PracticeOption.LEAST, text: "Least Practiced", sort: sortLeastPracticed },
  { id: PracticeOption.MOST, text: "Most Practiced", sort: sortMostPracticed },
  { id: PracticeOption.RANDOM, text: "Random", sort: sortRandom },
  { id: PracticeOption.WEAKEST, text: "Weakest", disabled: true, sort: () => [] },
  { id: PracticeOption.STRONGEST, text: "Strongest", disabled: true, sort: () => [] }
];