import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes';
import Practice from './routes/practice';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/practice/:category",
    element: <Practice />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" >
      <a href="/">
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Ready Set Match
        </Typography>
      </a>
      <RouterProvider router={router} />
    </Container>
    </ThemeProvider>
  </React.StrictMode>,
);
