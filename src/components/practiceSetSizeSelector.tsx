import React from 'react';
import { FormControl, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const setSizeKey = 'setSize';
const setSizeDefault = 7;
export const setSizeAtom = atomWithStorage(setSizeKey, setSizeDefault, undefined, { getOnInit: true });

export default function PracticeSetSizeSelector() {
  const [setSize, setSetSize] = useAtom(setSizeAtom);

  const updatedSetSize = (newSize: number) => {
    if (newSize > 0) {
      setSetSize(newSize);
    }
  }

  return (
    <FormControl sx={{ marginRight: 1, width: 200 }}>
      <TextField
        id="set-size"
        label="Amount of sets"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ width: 120 }}
        value={setSize}
        variant="filled"
        onChange={(e) => { updatedSetSize(Number(e.target.value)); }}
      />
    </FormControl>
  );
}
