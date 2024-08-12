import React from 'react';
import { Route, Routes } from "react-router-dom";
import Index from 'src/routes';
import CategoryDetail from "src/routes/categoryDetail";
import DataDetail from 'src/routes/dataDetail';
import Practice from 'src/routes/practice';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/practice/:categoryId" element={<Practice />} />
      <Route path="/category/:categoryId" element={<CategoryDetail />} />
      <Route path="/data" element={<DataDetail />} />
    </Routes>
  );
}