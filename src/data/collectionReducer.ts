import { atom } from "jotai";
import { stateAtom } from "src/data/state";
import { deleteCollection, persistCollection } from "src/data/dbConnector";
import { Data, Collection } from "src/types";

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

interface CollectionCreatePayload extends PayloadBase {
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

type Payload = CollectionCreatePayload | CollectionUpdatePayload | CollectionDeletePayload;

const collectionCreate = (prevState: Data, payload: CollectionCreatePayload) => {
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

const collectionUpdate = (prevState: Data, payload: CollectionUpdatePayload) => {
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

const collectionDelete = (prevState: Data, payload: CollectionDeletePayload) => {
  deleteCollection(payload.collectionId);
  return {
    ...prevState,
    collections: prevState.collections.filter(({ name }) => name !== payload.collectionId)
  };
}

const collectionReducer = (prevState: Data, payload: Payload): Data => {
  switch (payload.action) {
    case CollectionReducerAction.CREATE_COLLECTION:
      return collectionCreate(prevState, payload);
    case CollectionReducerAction.UPDATE_COLLECTION:
      return collectionUpdate(prevState, payload);
    case CollectionReducerAction.DELETE_COLLECTION:
      return collectionDelete(prevState, payload);
    default:
      return prevState;
  }
}

export const collectionsAtom = atom(
  (get) => get(stateAtom).collections,
  (get, set, action: Payload) => {
    set(stateAtom, collectionReducer(get(stateAtom), action))
  }
);
