import { Data } from "src/types";
import { atom } from "jotai";
import { getAllCollections, getAllCategories, initDB } from 'src/data/dbConnector';

await initDB();

const initialState: Data = {
  collections: await getAllCollections(),
  categories: await getAllCategories(),
}

export const stateAtom = atom<Data>(initialState);
