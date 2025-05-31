// import { create } from "zustand";
// import { Product, ProductStore } from "./types"; // Adjust path as needed

// const initialProducts: Product[] = [
//   {
//     id: 0,
//     name: "IBU-ratiopharm 400mg akut Schmerztabletten",
//     dosage: "400",
//     unit: "mg",
//     type: "Tabletten",
//     rating: 4.7,
//     reviewsCount: 2184,
//     originalPrice: 5.97,
//     discountedPrice: 4.79,
//     discountPercent: 20,
//     pricePerUnit: "0,24 €/St",
//     isFavorite: true,
//   },
//   {
//     id: 1,
//     name: "Thomapyrin Intensiv 20",
//     dosage: "20",
//     unit: "St",
//     type: "Tabletten",
//     rating: 4.8,
//     reviewsCount: 1129,
//     originalPrice: 6.99,
//     discountedPrice: 5.45,
//     discountPercent: 22,
//     pricePerUnit: "0,27 €/St",
//     isFavorite: false,
//   },
//   {
//     id: 2,
//     name: "Voltaren Schmerzgel forte 2,32 % Gel 180 g",
//     dosage: "180",
//     unit: "g",
//     type: "Gel",
//     rating: 4.9,
//     reviewsCount: 3186,
//     originalPrice: 24.99,
//     discountedPrice: 19.49,
//     discountPercent: 22,
//     pricePerUnit: "108,28 €/kg",
//     isFavorite: false,
//   },
// ];

// export const useProductStore = create<ProductStore>((set, get) => ({
//   products: initialProducts,

//   getProducts: () => get().products,

//   toggleFavorite: (id: number) =>
//     set((state) => ({
//       products: state.products.map((product) =>
//         product.id === id
//           ? { ...product, isFavorite: !product.isFavorite }
//           : product,
//       ),
//     })),
// }));
