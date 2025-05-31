import { Screen, SearchBar, ProductsRow, Header, RedeemButton } from '@repo/ui'
import { useProductsWithFavorites, useToggleFavorite } from '@repo/hooks'
import { ImageSourcePropType } from 'react-native'
import { type Product } from '@repo/stores/products'

type ProductCategory = {
  id: number
  title: string
  products: (Product & {
    image?: ImageSourcePropType
    isFavorite: boolean
  })[]
}

export const HomeScreen = () => {
  const { products, isLoading } = useProductsWithFavorites()
  const toggleFavorite = useToggleFavorite()

  const productCategories: ProductCategory[] = [
    { id: 1, title: 'Best sellers', products: products.slice(0, 3) },
    { id: 2, title: 'Offers', products: products.slice(0, 3) },
    { id: 3, title: 'Private Label', products: products.slice(0, 3) },
  ]

  return (
    <Screen>
      <Header />
      <SearchBar />
      <RedeemButton />
      {!isLoading &&
        productCategories.map((category) => (
          <ProductsRow
            key={category.id}
            title={category.title}
            products={category.products}
            onToggleFavorite={(id) => toggleFavorite.mutate(id)}
          />
        ))}
    </Screen>
  )
}
