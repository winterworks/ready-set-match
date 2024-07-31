import { data } from "src/data/data";
import { atomWithStorage } from 'jotai/utils'

const key = 'readySetMatchData';

export const stateAtom = atomWithStorage(key, data, undefined, { getOnInit: true });