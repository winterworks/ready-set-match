import { Collection } from "src/types";

export function findCollection(collections: Collection[], findId: string) {
  return collections.find(({ id }) => id === findId)
}