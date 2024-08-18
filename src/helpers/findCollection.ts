import { Collection } from "src/types";

export function findCollection(collections: Collection[], findName: string) {
  return collections.find(({ name }) => name === findName)
}