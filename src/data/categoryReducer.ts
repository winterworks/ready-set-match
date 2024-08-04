import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { Data, Set } from "src/types";

export interface CategoryReducerPayload {
  action: CategoryReducerAction;
  categoryId: string;
  updatedSet: Set;
}

export enum CategoryReducerAction {
  UPDATE_SET = "UPDATE_SET"
}

const categoryReducer = (prevState: Data, payload: CategoryReducerPayload): Data => {
  switch (payload.action) {
    case CategoryReducerAction.UPDATE_SET:
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [payload.categoryId]: {
            ...prevState.categories[payload.categoryId],
            sets: prevState.categories[payload.categoryId].sets.map(set => set.id === payload.updatedSet.id ? payload.updatedSet : set )
          }
        }
      }
    default:
      return prevState;
  }
}

export const categoryAtom = atom(
  (get) => (categoryId: string) => get(stateAtom).categories[categoryId],
  (get, set, action: CategoryReducerPayload) => {
    set(stateAtom, categoryReducer(get(stateAtom), action))
  }
)
