// @repo/hooks/useToggleFavorite.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleFavoriteApi } from '@repo/api/products'
import { useFavoriteStore } from '@repo/stores/products'

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()
  const { favoriteIds, optimisticToggle, setFavorites } = useFavoriteStore()

  return useMutation({
    mutationFn: (productId: number) => toggleFavoriteApi(productId),

    onMutate: async (productId: number) => {
      // Cancel ongoing refetches to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ['userFavorites'] })

      // Optimistically update local store
      optimisticToggle(productId)

      // Keep previous state in case of rollback
      return { previousFavorites: [...favoriteIds] }
    },

    onError: (_error, _productId, context) => {
      // Rollback on failure
      if (context?.previousFavorites) {
        setFavorites(context.previousFavorites)
      }
    },

    onSettled: () => {
      // Ensure cache is up to date
      queryClient.invalidateQueries({ queryKey: ['userFavorites'] })
    },
  })
}
