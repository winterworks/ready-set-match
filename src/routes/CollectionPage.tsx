import React from 'react'
import { AppBar, Tab, Tabs, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import { collectionsAtom } from 'src/data/collectionReducer'
import SetsTable from 'src/components/setsTable'
import { findCollection, findSubCollections } from 'src/helpers/collectionHelpers'
import CollectionsGird from 'src/components/collectionGird'
import { HeaderMenu } from 'src/components/headerMenu'
import CollectionDetail from 'src/components/collectionDetail'
import CollectionEdit from 'src/components/collectionEdit'

enum TABS {
  DETAIL = "Detail",
  SETS = 'Sets',
  EDIT = "Edit"
}

export default function CollectionPage() {
  const { collectionId } = useParams()
  const [collections] = useAtom(collectionsAtom)

  const collection = collectionId ? findCollection(collections, collectionId) : undefined
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
  }
  const subCollections = findSubCollections(collections, collectionId)

  // const totalPracticed = sets.reduce((acc, set) => {
  //   if (set.practiced) {
  //     return acc + set.practiced
  //   }
  //   return acc
  // }, 0)

  const [activeTab, setActiveTab] = React.useState<string>(TABS.DETAIL);

  return (
    <>
      <HeaderMenu />
      <Typography component="h2" variant="h4" gutterBottom>
        {collection.name}
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue: string) => setActiveTab(newValue)}
        aria-label="collection detail tabs"
        role="navigation"
        sx={{ marginBottom: 2 }}
      >
        <Tab label={TABS.DETAIL} value={TABS.DETAIL} />
        <Tab label={TABS.SETS} value={TABS.SETS} />
        <Tab label={TABS.EDIT} value={TABS.EDIT} />
      </Tabs>

      {activeTab === TABS.DETAIL &&
        <CollectionDetail
          collection={collection}
          subCollections={subCollections}
        />
      }
      {activeTab === TABS.SETS &&
        <SetsTable collection={collection} />
      }
      {activeTab === TABS.EDIT &&
        <CollectionEdit collection={collection}/>
      }
    </>
  )
}
