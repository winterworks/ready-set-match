import { createBrowserRouter } from "react-router-dom";
import Root from 'src/routes';
import Practice from 'src/routes/practice';
import { RouterProvider } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/practice/:category",
    element: <Practice />
  }
]);