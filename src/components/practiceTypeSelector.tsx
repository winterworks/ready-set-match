import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PracticeOption, practiceOptions } from "src/helpers/setSorting";

const practiceTypeKey = 'practiceType';
export const practiceTypeAtom = atomWithStorage(practiceTypeKey, PracticeOption.LEAST, undefined, { getOnInit: true });

export default function PracticeOptionSelector() {
  const [practiceType, setPracticeType] = useAtom(practiceTypeAtom);

  return (
    <ButtonGroup size="large" aria-label="Large button group">
      {practiceOptions.map(({ id, text, disabled }) => (
        <Button
          key={id}
          variant={practiceType === id ? "contained" : "outlined" }
          disabled={disabled}
          onClick={() => setPracticeType(id)}
        >
          { text }
        </Button>
      ))}
    </ButtonGroup>
  );
}
