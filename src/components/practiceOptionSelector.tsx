import { Button, ButtonGroup } from "@mui/material";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PracticeElement, PracticeOption, practiceOptions } from "src/helpers/setSorting";

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
