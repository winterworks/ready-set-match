export interface Data {
  collections: Collection[]
}

export interface Collection {
  id: string
  name: string
  sets: Set[]

  parentCollectionId?: string
  link?: string
  icon?: string
  aIsLarge?: boolean
  bIsLarge?: boolean
}

export interface Set {
  id: string
  a: string
  b: string

  practiced?: number
  mistakes?: number
}
