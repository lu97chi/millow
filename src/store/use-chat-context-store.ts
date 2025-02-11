import { create } from "zustand";
import { Property } from "@/server/models/property";

interface ChatContextStore {
  propertyContext: Property | null;
  setPropertyContext: (property: Property | null) => void;
}

export const useChatContextStore = create<ChatContextStore>((set) => ({
  propertyContext: null,
  setPropertyContext: (property) => set({ propertyContext: property }),
})); 