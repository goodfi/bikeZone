'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/types';

interface FavoritesStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.filter((item) => item.id !== product.id),
            };
          }

          return {
            items: [...state.items, product],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
