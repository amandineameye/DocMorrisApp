import React, { createContext, useContext, ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { BrandConfig } from "../brandConfig";

const BrandContext = createContext<BrandConfig | undefined>(undefined);

interface BrandProviderProps {
  config: BrandConfig;
  children: ReactNode;
}

export const BrandProvider = ({ config, children }: BrandProviderProps) => {
  return (
    <BrandContext.Provider value={config}>
      <ThemeProvider theme={config.theme}>{children}</ThemeProvider>
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};
