import React from 'react';
import { TextField } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const setSizeKey = 'setSize';
const setSizeDefault = 7;
export const setSizeAtom = atomWithStorage(setSizeKey, setSizeDefault, undefined, { getOnInit: true });

export default function PracticeSetSizeSelector() {
  const [setSize, setSetSize] = useAtom(setSizeAtom);

  return (
    <TextField
      id="set-size"
      label="Set size"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      value={setSize}
      variant="filled"
      onChange={(e) => { setSetSize(Number(e.target.value)); }}
    />
  );
}
