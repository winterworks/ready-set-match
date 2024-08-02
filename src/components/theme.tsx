import React from 'react';
import { PaletteMode, ThemeProvider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode
    },
  })
}

export default function Theme({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={getTheme(prefersDarkMode ? 'dark' : 'light')}>
      {children}
    </ThemeProvider>
  );
}
