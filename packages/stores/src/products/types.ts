export type Product = {
  id: number;
  name: string;
  dosage: string;
  unit: string;
  type: string;
  rating: number;
  reviewsCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  pricePerUnit: string;
  isFavorite: boolean;
};

export type ProductStore = {
  products: Product[];
  getProducts: () => Product[];
  toggleFavorite: (id: number) => void;
};
