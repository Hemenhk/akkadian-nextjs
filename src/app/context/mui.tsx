"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

export default function MUIProvider({ children }: { children: ReactNode }) {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
