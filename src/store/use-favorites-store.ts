import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Property } from "@/types";

interface FavoritesStore {
  favorites: Property[];
  addFavorite: (property: Property) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (property) => {
        const { favorites } = get();
        if (!favorites.find(p => p.id === property.id)) {
          set({ favorites: [...favorites, property] });
        }
      },
      removeFavorite: (propertyId) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(p => p.id !== propertyId) });
      },
      isFavorite: (propertyId) => {
        const { favorites } = get();
        return favorites.some(p => p.id === propertyId);
      },
    }),
    {
      name: "Tu Hogar - Favoritos",
    }
  )
); 