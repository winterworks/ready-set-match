import { useAtom } from "jotai";
import Categories from "src/components/categoryGrid";
import { stateAtom } from "src/data/state";

export default function Root() {
  const [state] = useAtom(stateAtom);

  return (
    <Categories categories={state.categories} />
  );
}