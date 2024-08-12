import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PracticeOption, practiceOptions } from "src/helpers/setSorting";

const practiceTypeKey = 'practiceType';
export const practiceTypeAtom = atomWithStorage(practiceTypeKey, PracticeOption.LEAST, undefined, { getOnInit: true });

export default function PracticeOptionSelector() {
  const [practiceType, setPracticeType] = useAtom(practiceTypeAtom);

  const handleChange = (event: SelectChangeEvent) => {
    setPracticeType(event.target.value as PracticeOption);
  };

  return (
    <FormControl variant="filled" sx={{ marginRight: 1, width: 200 }}>
      <InputLabel id="practice-option-select">Set selection</InputLabel>
      <Select
        labelId="practice-option-select"
        id="practice-option-select"
        value={practiceType}
        label="Set selection"
        onChange={handleChange}
      >
        {practiceOptions.map(({ id, text, disabled }) => (
          <MenuItem key={id} value={id} disabled={disabled}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
