import { Collection, Data } from 'src/types'

const dbName = 'ready-set-match-db'
const dbVersion = 1

let db: IDBDatabase | undefined

enum OBJECT_STORES {
  COLLECTIONS = 'collections',
}

export function initDB(): Promise<void> {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName, dbVersion)
    request.onerror = () => {
      console.error('The user or browser did not allow the use of the IndexedDB')
    }

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      db = (event.target as IDBOpenDBRequest).result
      if (event.oldVersion < 1) {
        db.createObjectStore(OBJECT_STORES.COLLECTIONS, { keyPath: 'id' })
      }
    }

    request.onsuccess = (event: Event) => {
      db = (event.target as IDBOpenDBRequest).result
      resolve()
    }

    request.onerror = () => {
      console.error(new Error('Could not connect to IndexedDB'))
    }
  })
}

async function getFromIndexedDB(objectStoreId: OBJECT_STORES, id?: string) {
  return new Promise((resolve) => {
    if (!db) {
      return
    }
    const transaction = db.transaction([objectStoreId], 'readonly')
    const store = transaction.objectStore(objectStoreId)

    let request
    if (id) {
      request = store.get(id)
    }
    else {
      request = store.getAll()
    }

    request.onerror = () => {
      console.error(new Error('Could not get collection(s) from the IndexedDB'))
    }
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

function storeToIndexedDB(objectStoreId: OBJECT_STORES, object: unknown) {
  if (!db) {
    return
  }
  const transaction = db.transaction([objectStoreId], 'readwrite')
  const store = transaction.objectStore(objectStoreId)

  const request = store.put(object)

  request.onerror = () => {
    console.error(new Error('Could not store the collection in the IndexedDB'))
  }
}

function removeFromIndexedDB(objectStoreId: OBJECT_STORES, id: string) {
  if (!db) {
    return
  }
  const transaction = db.transaction([objectStoreId], 'readwrite')
  const store = transaction.objectStore(objectStoreId)

  const request = store.delete(id)

  request.onerror = () => {
    console.error(new Error('Could not remove collection from the IndexedDB'))
  }
}

export function persistCollection(collection: Collection, oldId?: string) {
  if (oldId) {
    removeFromIndexedDB(OBJECT_STORES.COLLECTIONS, oldId)
  }
  storeToIndexedDB(OBJECT_STORES.COLLECTIONS, collection)
}

// TODO fix name collision with getCollection atom
export async function getCollection(id: string) {
  return getFromIndexedDB(OBJECT_STORES.COLLECTIONS, id)
}

export function deleteCollection(id: string) {
  removeFromIndexedDB(OBJECT_STORES.COLLECTIONS, id)
}

export async function getAllCollections() {
  return (await getFromIndexedDB(OBJECT_STORES.COLLECTIONS)) as Collection[]
}

export function persistFullState(state: Data) {
  state.collections.forEach((collection) => {
    persistCollection(collection)
  })
}
