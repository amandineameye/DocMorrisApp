import { Screen, SearchBar, ProductsRow, Header, RedeemButton } from '@repo/ui'
import { useProductStore } from '@repo/stores/products'

export const HomeScreen = () => {
  const products = useProductStore((state) => state.products)

  return (
    <Screen>
      <Header />
      <SearchBar />
      <RedeemButton />
      <ProductsRow title="Best sellers" products={products.slice(0, 3)} />
      <ProductsRow title="Offers" products={products.slice(0, 3)} />
      <ProductsRow title="Private Label" products={products.slice(0, 3)} />
    </Screen>
  )
}
