import type { Metadata } from "next";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: "Ready Set Match",
  description: "A set practicing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Container maxWidth="md">
            <a href="/">
              <Typography component="h1" variant="h2" align="center" gutterBottom>
                Ready Set Match
              </Typography>
            </a>
            {children}
          </Container>
      </body>
    </html>
  );
}
