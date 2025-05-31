import { docMorrisTheme, brandBTheme, type Theme } from '../themes'
import { ImageSourcePropType } from 'react-native'

export type BrandId = 'docmorris' | 'brandb'
export interface BrandConfig {
  name: string
  theme: Theme
  logo: ImageSourcePropType // handled by each app
  ads: ImageSourcePropType[] // handled by each app
  productImgs: { id: number; image: ImageSourcePropType }[] // handled by each app
}

type BrandBaseConfig = Pick<BrandConfig, 'name' | 'theme'>

export const brandBaseConfigs: Record<BrandId, BrandBaseConfig> = {
  docmorris: {
    name: 'DocMorris',
    theme: docMorrisTheme,
  },
  brandb: {
    name: 'BrandB',
    theme: brandBTheme,
  },
}
