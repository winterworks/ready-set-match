import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { Data, Set } from "src/types";

export enum SetReducerAction {
  CREATE_SET = "CREATE_SET",
  UPDATE_SET = "UPDATE_SET",
  DELETE_SET = "DELETE_SET"
}

interface PayloadBase {
  collectionId: string;
  action: SetReducerAction;
}

interface SetAddPayload extends PayloadBase {
  action: SetReducerAction.CREATE_SET;
  set: Set;
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

const collectionReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case SetReducerAction.CREATE_SET: {
      const prevSets = prevState.collections[payload.collectionId].sets;
      return {
        ...prevState,
        collections: {
          ...prevState.collections,
          [payload.collectionId]: {
            ...prevState.collections[payload.collectionId],
            sets: [payload.set, ...prevSets, ]
          }
        }
      };
    }
    case SetReducerAction.UPDATE_SET:
      return {
        ...prevState,
        collections: {
          ...prevState.collections,
          [payload.collectionId]: {
            ...prevState.collections[payload.collectionId],
            sets: prevState.collections[payload.collectionId].sets.map(
              set => set.id === payload.set.id ? payload.set : set
            )
          }
        }
      };
    case SetReducerAction.DELETE_SET:
      return {
        ...prevState,
        collections: {
          ...prevState.collections,
          [payload.collectionId]: {
            ...prevState.collections[payload.collectionId],
            sets: prevState.collections[payload.collectionId].sets.filter(
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
  (get) => (collectionId: string): Set[] | undefined => get(stateAtom).collections[collectionId].sets,
  (get, set, action: Payload) => {
    set(stateAtom, collectionReducer(get(stateAtom), action))
  }
);

