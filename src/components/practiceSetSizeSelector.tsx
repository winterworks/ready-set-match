import React from 'react'
import { TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const setSizeKey = 'setSize'
const setSizeDefault = 7
export const setSizeAtom = atomWithStorage(setSizeKey, setSizeDefault, undefined, { getOnInit: true })

export default function PracticeSetSizeSelector() {
  const [setSize, setSetSize] = useAtom(setSizeAtom)

  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value)
    if (newSize > 0) {
      setSetSize(newSize)
    }
  }

  return (
    <TextField
      id="set-size"
      label="Amount of sets"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ width: 100 }}
      value={setSize}
      variant="filled"
      onChange={onInputChanged}
    />
  )
}
