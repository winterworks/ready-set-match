import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from 'src/routes';
import CategoryDetail from "src/routes/categoryDetail";
import DataDetail from 'src/routes/dataDetail';
import Practice from 'src/routes/practice';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/practice/:categoryId",
    element: <Practice />
  },
  {
    path: "/category/:categoryId",
    element: <CategoryDetail />
  },
  {
    path: "/data",
    element: <DataDetail />
  }
]);