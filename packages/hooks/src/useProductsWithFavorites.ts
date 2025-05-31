import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchUserFavorites } from '@repo/api/products'
import { useFavoriteStore } from '@repo/stores/products'
import { useBrand } from '@repo/theme'
import { useEffect } from 'react'

export const useProductsWithFavorites = () => {
  const { productImgs } = useBrand()
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds)
  const setFavorites = useFavoriteStore((state) => state.setFavorites)

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const {
    data: userFavorites,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
  } = useQuery({
    queryKey: ['userFavorites'],
    queryFn: fetchUserFavorites,
  })

  useEffect(() => {
    if (userFavorites) {
      setFavorites(userFavorites)
    }
  }, [userFavorites, setFavorites])

  const enrichedProducts =
    products?.map((product) => ({
      ...product,
      image: productImgs.find((img) => img.id === product.id)?.image,
      isFavorite: favoriteIds.includes(product.id),
    })) ?? []

  return {
    products: enrichedProducts,
    isLoading: isLoadingProducts || isLoadingFavorites,
    isError: isErrorProducts || isErrorFavorites,
  }
}
