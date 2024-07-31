import { Button, ButtonGroup } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export enum PracticeOption {
  LEAST = "LEAST",
  MOST = "MOST",
  WEAKEST = "WEAKEST",
  STRONGEST = "STRONGEST"
}

export interface PracticeElement {
  id: PracticeOption;
  text: string;

  disabled?: boolean;
}

export const practiceOptions: PracticeElement[] = [
  { id: PracticeOption.LEAST, text: "Least Practiced"  },
  { id: PracticeOption.MOST, text: "Most Practiced" },
  { id: PracticeOption.WEAKEST, text: "Weakest", disabled: true },
  { id: PracticeOption.STRONGEST, text: "Strongest", disabled: true }
];

const practiceKey = 'practiceOption';
export const practiceAtom = atomWithStorage(practiceKey, PracticeOption.LEAST, undefined, { getOnInit: true });

export default function PracticeOptionSelector() {
  const [selectedOption, setSelectedOption] = useAtom(practiceAtom);

  function renderButton({ id, text, disabled }: PracticeElement) {
    return (
      <Button
        key={id}
        variant={selectedOption === id ? "contained" : "outlined" }
        disabled={disabled}
        onClick={() => setSelectedOption(id)}
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
