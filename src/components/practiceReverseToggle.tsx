import React from 'react'
import { ToggleButton } from '@mui/material'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const setReverseKey = 'setReverse'
const setReverseDefault = true
export const setReverseAtom = atomWithStorage(setReverseKey, setReverseDefault, undefined, { getOnInit: true })

export default function PracticeReverseToggle() {
  const [setReversed, setSetReverse] = useAtom(setReverseAtom)

  return (
    <ToggleButton
      id="set-reversed"
      value="check"
      selected={setReversed}
      sx={{ marginRight: 1 }}
      onChange={() => {
        setSetReverse(!setReversed)
      }}
    >
      {setReversed ? <ArrowBackIcon /> : <ArrowForwardIcon />}
    </ToggleButton>
  )
}
