import { initialProducts } from './mockDb'
import { type Product } from './types'

let mockFavoriteIds: number[] = [0] // default favorites (you can start empty)

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialProducts), 300) // simulate API delay
  })
}

export const fetchUserFavorites = async (): Promise<number[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => resolve([0, 2]), 300)
  })
}

export const toggleFavoriteApi = (productId: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockFavoriteIds.includes(productId)) {
        mockFavoriteIds = mockFavoriteIds.filter((id) => id !== productId)
      } else {
        mockFavoriteIds.push(productId)
      }
      resolve()
    }, 300)
  })
}
