import { atom } from 'jotai'
import { persistCollection } from 'src/data/dbConnector'
import { stateAtom } from 'src/data/state'
import { findCollection } from 'src/helpers/collectionHelpers'
import { Collection, Data, Set } from 'src/types'

export enum SetReducerAction {
  CREATE_SET = 'CREATE_SET',
  UPDATE_SET = 'UPDATE_SET',
  DELETE_SET = 'DELETE_SET',
}

interface PayloadBase {
  collectionId: string
  action: SetReducerAction
}

interface SetCreatePayload extends PayloadBase {
  action: SetReducerAction.CREATE_SET
  set: Set
}

interface SetUpdatePayload extends PayloadBase {
  action: SetReducerAction.UPDATE_SET
  set: Set
}

interface SetDeletePayload extends PayloadBase {
  action: SetReducerAction.DELETE_SET
  setId: string
}

type Payload = SetCreatePayload | SetUpdatePayload | SetDeletePayload

const setCreate = (prevState: Data, payload: SetCreatePayload) => {
  return prevState.collections.map((collection) => {
    if (collection.id !== payload.collectionId) {
      return collection
    }
    const updatedCollection = {
      ...collection,
      sets: [payload.set, ...collection.sets],
    }
    persistCollection(updatedCollection)
    return updatedCollection
  })
}

const setUpdate = (prevState: Data, payload: SetUpdatePayload) => {
  return prevState.collections.map((collection) => {
    if (collection.id !== payload.collectionId) {
      return collection
    }
    const updatedCollection = {
      ...collection,
      sets: collection.sets.map(
        set => set.id === payload.set.id ? payload.set : set,
      ),
    }
    persistCollection(updatedCollection)
    return updatedCollection
  })
}

const setDelete = (prevState: Data, payload: SetDeletePayload) => {
  return prevState.collections.map((collection) => {
    if (collection.id !== payload.collectionId) {
      return collection
    }
    const updatedCollection = {
      ...collection,
      sets: collection.sets.filter(
        set => set.id !== payload.setId,
      ),
    }
    persistCollection(updatedCollection)
    return updatedCollection
  })
}

const setReducerAction = (prevState: Data, payload: Payload): Collection[] => {
  switch (payload.action) {
    case SetReducerAction.CREATE_SET:
      return setCreate(prevState, payload)
    case SetReducerAction.UPDATE_SET:
      return setUpdate(prevState, payload)
    case SetReducerAction.DELETE_SET:
      return setDelete(prevState, payload)
    default:
      return prevState.collections
  }
}

const setReducer = (prevState: Data, payload: Payload): Data => {
  return {
    ...prevState,
    collections: setReducerAction(prevState, payload),
  }
}

export const setsAtom = atom(
  get => (collectionId: string): Set[] | undefined => findCollection(get(stateAtom).collections, collectionId)?.sets,
  (get, set, action: Payload) => {
    set(stateAtom, setReducer(get(stateAtom), action))
  },
)
