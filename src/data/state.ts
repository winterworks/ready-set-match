import { data } from "src/data/data";
import { atomWithStorage } from 'jotai/utils'
import { Data } from "src/types";

const key = 'readySetMatchData';

// TODO move from localStorage to IndexedDB
export const stateAtom = atomWithStorage<Data>(key, data, undefined, { getOnInit: true });

