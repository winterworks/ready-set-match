import React from 'react';
import { useAtom } from "jotai";
import { collectionsAtom } from 'src/data/collectionReducer';
import CollectionsGird from 'src/components/collectionGird';
import { HeaderMenu } from 'src/components/headerMenu';

export default function Index() {
  const [collections] = useAtom(collectionsAtom);

  return (
    <>
      <HeaderMenu />
      <CollectionsGird collections={collections} />
    </>
  );
}