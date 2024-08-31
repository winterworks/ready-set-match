import { Collection, Set } from 'src/types'

export function findCollection(collections: Collection[], findId: string) {
  return collections.find(({ id }) => id === findId)
}

export function findSubCollections(collections: Collection[], parentCollectionId: string) {
  return collections.filter(collection => collection.parentCollectionId === parentCollectionId)
}

export function getAllSubSets(collections: Collection[]) {
  return collections.reduce<Set[]>((acc, collection) => [...acc, ...collection.sets], [])
}