import React from 'react';
import { createRoot} from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import theme from 'src/theme';
import { RouterProvider } from "react-router-dom";
import { router } from 'src/router';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" >
        <a href="/">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Ready Set Match
          </Typography>
        </a>
        <Divider sx={{ width: "100%", marginBottom: 4 }}/>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  </React.StrictMode>,
);
