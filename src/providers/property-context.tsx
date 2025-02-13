"use client";

import { createContext, useContext, useState } from "react";
import type { Property } from "@/types";

interface PropertyContextType {
  currentProperty: Property | null;
  setCurrentProperty: (property: Property | null) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);

  return (
    <PropertyContext.Provider value={{ currentProperty, setCurrentProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
} 