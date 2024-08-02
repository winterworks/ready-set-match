import React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PracticeElement, PracticeOption, practiceOptions } from "src/helpers/setSorting";

const practiceTypeKey = 'practiceType';
export const practiceTypeAtom = atomWithStorage(practiceTypeKey, PracticeOption.LEAST, undefined, { getOnInit: true });

export default function PracticeOptionSelector() {
  const [practiceType, setPracticeType] = useAtom(practiceTypeAtom);

  function renderButton({ id, text, disabled }: PracticeElement) {
    return (
      <Button
        key={id}
        variant={practiceType === id ? "contained" : "outlined" }
        disabled={disabled}
        onClick={() => setPracticeType(id)}
      >
        { text }
      </Button>
    );
  }

  return (
    <ButtonGroup size="large" aria-label="Large button group">
      {practiceOptions.map(renderButton)}
    </ButtonGroup>
  );
}
