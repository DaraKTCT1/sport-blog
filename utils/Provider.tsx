"use client";

import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "next-themes";

export const Provider = ({ children, ...props }: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
