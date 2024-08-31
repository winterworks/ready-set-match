import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from 'src/routes'
import CollectionPage from 'src/routes/CollectionPage'
import DataDetail from 'src/routes/dataDetail'
import Practice from 'src/routes/practice'

// TODO define the routes and paths together
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/practice/:collectionId" element={<Practice />} />
      <Route path="/collection/:collectionId" element={<CollectionPage />} />
      <Route path="/data" element={<DataDetail />} />
    </Routes>
  )
}
