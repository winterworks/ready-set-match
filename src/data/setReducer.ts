import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { Data, Set } from "src/types";
import { v4 as uuidv4 } from 'uuid';

export enum SetReducerAction {
  ADD_SET = "ADD_SET",
  UPDATE_SET = "UPDATE_SET",
  DELETE_SET = "DELETE_SET"
}

export type NewSet = Pick<Set, "a" | "b">;

interface PayloadBase {
  categoryId: string;
  action: SetReducerAction;
}

interface SetAddPayload extends PayloadBase {
  action: SetReducerAction.ADD_SET;
  set: NewSet;
}

interface SetUpdatePayload extends PayloadBase  {
  action: SetReducerAction.UPDATE_SET;
  set: Set;
}

interface SetDeletePayload extends PayloadBase  {
  action: SetReducerAction.DELETE_SET;
  setId: string;
}

type Payload = SetAddPayload | SetUpdatePayload | SetDeletePayload;

const categoryReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case SetReducerAction.ADD_SET: {
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
    case SetReducerAction.UPDATE_SET:
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
    case SetReducerAction.DELETE_SET:
      return {
        ...prevState,
        categories: {
          ...prevState.categories,
          [payload.categoryId]: {
            ...prevState.categories[payload.categoryId],
            sets: prevState.categories[payload.categoryId].sets.filter(
              set => set.id !== payload.setId
            )
          }
        }
      };
    default:
      return prevState;
  }
}

export const setsAtom = atom(
  (get) => (categoryId: string) => get(stateAtom).categories[categoryId].sets,
  (get, set, action: Payload) => {
    set(stateAtom, categoryReducer(get(stateAtom), action))
  }
);

