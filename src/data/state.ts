import { Data } from "src/types";
import { atom } from "jotai";
import { getAllCollections, getAllCategories, initDB, persistFullState } from 'src/data/dbConnector';
import { data } from "src/data/data";

await initDB();

const [collections, categories] = await Promise.all([
  getAllCollections(),
  getAllCategories()
]);

let initialState: Data
if (collections.length || categories.length) {
  initialState = { categories, collections };
} else {
  initialState = data;
  persistFullState(initialState);
}

export const stateAtom = atom<Data>(initialState);
