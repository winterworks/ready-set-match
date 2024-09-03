import React from 'react'
import { Divider, Tab, Tabs, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import { collectionsAtom } from 'src/data/collectionReducer'
import SetsTable from 'src/components/setsTable'
import { findCollection, findSubCollections } from 'src/helpers/collectionHelpers'
import { HeaderMenu } from 'src/components/headerMenu'
import CollectionDetail from 'src/components/collectionDetail'
import CollectionEdit from 'src/components/collectionEdit'

enum TABS {
  DETAIL = 'Detail',
  SETS = 'Sets',
  EDIT = 'Edit',
}

export default function CollectionPage() {
  const { collectionId } = useParams()
  const [collections] = useAtom(collectionsAtom)

  const collection = collectionId ? findCollection(collections, collectionId) : undefined
  if (!collectionId || !collection) {
    return <>This collection does not exist</>
  }
  const subCollections = findSubCollections(collections, collectionId)

  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.DETAIL)

  return (
    <>
      <HeaderMenu collection={collection} />
      <Typography component="h2" variant="h4" gutterBottom>
        {collection.name}
      </Typography>
      <Tabs
        value={activeTab}
        onChange={(e, newValue: string) => { setActiveTab(newValue as TABS) }}
        aria-label="collection detail tabs"
        role="navigation"
        sx={{ marginBottom: 2, borderBottom: 1 }}
      >
        <Tab label={TABS.DETAIL} value={TABS.DETAIL} />
        <Tab label={TABS.SETS} value={TABS.SETS} />
        <Tab label={TABS.EDIT} value={TABS.EDIT} />
      </Tabs>

      {activeTab === TABS.DETAIL
      && (
        <CollectionDetail
          collection={collection}
          subCollections={subCollections}
        />
      )}
      {activeTab === TABS.SETS
      && <SetsTable collection={collection} />}
      {activeTab === TABS.EDIT
      && <CollectionEdit collection={collection} />}
      <Divider sx={{ marginBottom: 16 }} />
    </>
  )
}
