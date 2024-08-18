import React from 'react';
import { Route, Routes } from "react-router-dom";
import Index from 'src/routes';
import CollectionDetail from "src/routes/collectionDetail";
import DataDetail from 'src/routes/dataDetail';
import Practice from 'src/routes/practice';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/practice/:collectionId" element={<Practice />} />
      <Route path="/collection/:collectionId" element={<CollectionDetail />} />
      <Route path="/data" element={<DataDetail />} />
    </Routes>
  );
}