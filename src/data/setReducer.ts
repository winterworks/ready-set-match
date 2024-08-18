import { atom } from "jotai";
import { persistCollection } from "src/data/dbConnector";
import { stateAtom } from "src/data/state";
import { findCollection } from "src/helpers/findCollection";
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
      const newCollections = prevState.collections.map(collection => {
        if (collection.name !== payload.collectionId) {
          return collection;
        }
        const updatedCollection = {
          ...collection,
          sets: [payload.set, ...collection.sets, ]
        };
        persistCollection(updatedCollection);
        return updatedCollection;
      });
      return {
        ...prevState,
        collections: newCollections
      };
    }
    case SetReducerAction.UPDATE_SET: {
      const newCollections = prevState.collections.map(collection => {
        if (collection.name !== payload.collectionId) {
          return collection;
        }
        const updatedCollection = {
          ...collection,
          sets: collection.sets.map(
            set => set.id === payload.set.id ? payload.set : set
          )
        };
        persistCollection(updatedCollection);
        return updatedCollection;
      });
      return {
        ...prevState,
        collections: newCollections
      };
    }
    case SetReducerAction.DELETE_SET: {
      const newCollections = prevState.collections.map(collection => {
        if (collection.name !== payload.collectionId) {
          return collection;
        }
        const updatedCollection = {
          ...collection,
          sets: collection.sets.filter(
            set => set.id !== payload.setId
          )
        }
        persistCollection(updatedCollection);
        return updatedCollection;
      });
      return {
        ...prevState,
        collections: newCollections
      };
    }
    default:
      return prevState;
  }
}

export const setsAtom = atom(
  (get) => (collectionId: string): Set[] | undefined => findCollection(get(stateAtom).collections, collectionId)?.sets,
  (get, set, action: Payload) => {
    set(stateAtom, collectionReducer(get(stateAtom), action))
  }
);

