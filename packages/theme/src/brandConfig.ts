import { SvgProps } from 'react-native-svg';
import { docMorrisTheme } from './themes/docMorris';
import { brandBTheme } from './themes/brandB';

export type BrandId = 'docmorris' | 'brandb';

export type Product = {
  id: number;
  image: any;
  name: string;
  dosage?: string;
  unit?: string;
  type?: string;
  rating?: number;
  reviewsCount?: number;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercent?: number;
  pricePerUnit?: string;
  isFavorite: boolean;
  onPress?: () => void;
};

export interface BrandConfig {
  name: string;
  logo: React.FC<SvgProps>; // handled by each app
  ads: any[]; // handled by each app
  theme: typeof docMorrisTheme;
  products: Product[];
}

export const brandBaseConfigs: Record<BrandId, Omit<BrandConfig, 'ads' | 'logo' | 'products'>> = {
  docmorris: {
    name: 'DocMorris',
    theme: docMorrisTheme,
  },
  brandb: {
    name: 'BrandB',
    theme: brandBTheme,
  },
};
