import { SvgProps } from 'react-native-svg';
import { docMorrisTheme } from './themes/docMorris';
import { brandBTheme } from './themes/brandB';

export type BrandId = 'docmorris' | 'brandb';

export interface BrandConfig {
  name: string;
  logo: React.FC<SvgProps>; // handled by each app
  ads: any[]; // handled by each app
  theme: typeof docMorrisTheme;
}

export const brandBaseConfigs: Record<BrandId, Omit<BrandConfig, 'ads' | 'logo'>> = {
  docmorris: {
    name: 'DocMorris',
    theme: docMorrisTheme,
  },
  brandb: {
    name: 'BrandB',
    theme: brandBTheme,
  },
};
