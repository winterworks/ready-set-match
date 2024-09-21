import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import Container from '@mui/material/Container'
import theme from 'src/theme'
import { AppRouter } from 'src/router'
import { Header } from 'src/components/header'
import { HashRouter } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Header />
          <AppRouter />
        </Container>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  void navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
}
