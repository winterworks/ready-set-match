import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { Data, Collection, Collections } from "src/types";

export enum CollectionReducerAction {
  CREATE_COLLECTION = "CREATE_COLLECTION",
  UPDATE_COLLECTION = "UPDATE_COLLECTION",
  DELETE_COLLECTION = "DELETE_COLLECTION",
}

export type NewCollection = Pick<Collection, "name" | "icon">;

interface PayloadBase {
  action: CollectionReducerAction;
  collectionId: string;
}

interface CollectionAddPayload extends PayloadBase {
  action: CollectionReducerAction.CREATE_COLLECTION;
  collection: NewCollection;
}

interface CollectionUpdatePayload extends PayloadBase  {
  action: CollectionReducerAction.UPDATE_COLLECTION;
  collection: Collection;
}

interface CollectionDeletePayload extends PayloadBase  {
  action: CollectionReducerAction.DELETE_COLLECTION;
  collectionId: string;
}

type Payload = CollectionAddPayload | CollectionUpdatePayload | CollectionDeletePayload;

const collectionReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case CollectionReducerAction.CREATE_COLLECTION: {
      const newCollection = {
        ...payload.collection,
        sets: []
      }
      return {
        ...prevState,
        collections: {
          ...prevState.collections,
          [newCollection.name]: newCollection
        }
      };
    }
    case CollectionReducerAction.UPDATE_COLLECTION:
      return {
        ...prevState,
        collections: {
          ...prevState.collections,
          [payload.collectionId]: payload.collection
        }
      };
    case CollectionReducerAction.DELETE_COLLECTION:{
      const filteredCollections: Collections = {};
      Object.keys(prevState.collections).forEach((key) => {
        if (key !== payload.collectionId) {
          filteredCollections[key] = prevState.collections[key];
        }
      });
      return {
        ...prevState,
        collections: filteredCollections
      };
    }
    default:
      return prevState;
  }
}

export const collectionAtom = atom(
  (get) => (collectionId: string): Collection | undefined => get(stateAtom).collections[collectionId],
  (get, collection, action: Payload) => {
    collection(stateAtom, collectionReducer(get(stateAtom), action))
  }
);

