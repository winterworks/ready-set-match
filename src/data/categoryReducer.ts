import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { Data, Set } from "src/types";
import { v4 as uuidv4 } from 'uuid';

export enum CategoryReducerAction {
  ADD_SET = "ADD_SET",
  UPDATE_SET = "UPDATE_SET",
}

export type NewSet = Pick<Set, "a" | "b">;

interface PayloadBase {
  categoryId: string;
  action: CategoryReducerAction;
}

interface SetAddPayload extends PayloadBase {
  action: CategoryReducerAction.ADD_SET;
  set: NewSet;
}

interface SetUpdatePayload extends PayloadBase  {
  action: CategoryReducerAction.UPDATE_SET;
  set: Set;
}

type Payload = SetAddPayload | SetUpdatePayload;

const categoryReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case CategoryReducerAction.ADD_SET: {
      const prevSets = prevState.categories[payload.categoryId].sets;
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [payload.categoryId]: {
            ...prevState.categories[payload.categoryId],
            sets: [{ id: uuidv4(), ...payload.set }, ...prevSets, ]
          }
        }
      };
    }
    case CategoryReducerAction.UPDATE_SET:
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [payload.categoryId]: {
            ...prevState.categories[payload.categoryId],
            sets: prevState.categories[payload.categoryId].sets.map(
              set => set.id === payload.set.id ? payload.set : set
            )
          }
        }
      };
    default:
      return prevState;
  }
}

export const categoryAtom = atom(
  (get) => (categoryId: string) => get(stateAtom).categories[categoryId],
  (get, set, action: Payload) => {
    set(stateAtom, categoryReducer(get(stateAtom), action))
  }
);
