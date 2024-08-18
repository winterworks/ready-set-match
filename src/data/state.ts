import { Data } from "src/types";
import { atom } from "jotai";
import { getAllCollections, initDB } from 'src/data/dbConnector';

await initDB();

const initialState: Data = {
  collections: await getAllCollections(),
}

export const stateAtom = atom<Data>(initialState);
