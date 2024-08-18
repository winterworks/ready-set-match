import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { persistCollection } from "src/data/dbConnector";
import { Data, Collection } from "src/types";
import { findCollection } from "src/helpers/findCollection";

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

  oldCollectionId?: string;
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
      persistCollection(newCollection);
      return {
        ...prevState,
        collections: [
          ...prevState.collections,
          newCollection
        ]
      };
    }
    case CollectionReducerAction.UPDATE_COLLECTION: {
      persistCollection(payload.collection, payload.collectionId);
      return {
        ...prevState,
        collections: prevState.collections.map((collection) => {
          if (collection.name !== payload.collectionId) {
            return collection;
          }
          return payload.collection
        })
      };
    }
    case CollectionReducerAction.DELETE_COLLECTION:{
      return {
        ...prevState,
        collections: prevState.collections.filter(({ name }) => name !== payload.collectionId)
      };
    }
    default:
      return prevState;
  }
}

export const collectionAtom = atom(
  (get) => (collectionId: string): Collection | undefined => findCollection(get(stateAtom).collections , collectionId),
  (get, collection, action: Payload) => {
    collection(stateAtom, collectionReducer(get(stateAtom), action))
  }
);

