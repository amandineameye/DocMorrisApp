import { create } from 'zustand'

type FavoriteStore = {
  favoriteIds: number[]
  setFavorites: (ids: number[]) => void
  optimisticToggle: (id: number) => void
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favoriteIds: [],
  setFavorites: (ids) => set({ favoriteIds: ids }),
  optimisticToggle: (id) => {
    const current = get().favoriteIds
    const updated = current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    set({ favoriteIds: updated })
  },
}))
