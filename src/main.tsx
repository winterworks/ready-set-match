import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import theme from 'src/theme'
import { AppRouter } from 'src/router'
import { Header } from 'src/components/header'
import { BrowserRouter } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Header />
          <AppRouter />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  void navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
}
