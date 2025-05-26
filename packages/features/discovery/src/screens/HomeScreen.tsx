import { Screen } from '@repo/ui/Screen';
import { SearchBar } from '@repo/ui/SearchBar';
import { useBrand } from '@repo/theme/context';
import { ProductsRow } from '@repo/ui/ProductsRow';
import { useProductStore } from '@repo/stores/products/store';

export const HomeScreen = () => {
  const products = useProductStore((state) => state.products);

  return (
    <Screen>
      <SearchBar />
      <ProductsRow title="Best sellers" products={products.slice(0, 3)} />
      <ProductsRow title="Offers" products={products.slice(0, 3)} />
      <ProductsRow title="Private Label" products={products.slice(0, 3)} />
    </Screen>
  );
};
