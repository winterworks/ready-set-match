import { Data } from 'src/types'
import { atom } from 'jotai'
import { getAllCollections, initDB, persistFullState } from 'src/data/dbConnector'
import { data } from 'src/data/data'

await initDB()

const [collections] = await Promise.all([
  getAllCollections(),
])

let initialState: Data
if (collections.length) {
  initialState = { collections }
}
else {
  initialState = data
  persistFullState(initialState)
}

export const stateAtom = atom<Data>(initialState)
