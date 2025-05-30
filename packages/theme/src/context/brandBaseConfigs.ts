import { docMorrisTheme, brandBTheme, type Theme } from '../themes'

export type BrandId = 'docmorris' | 'brandb'
export interface BrandConfig {
  name: string
  theme: Theme
  logo: any // handled by each app
  ads: any[] // handled by each app
  productImgs: { id: number; image: any }[] // handled by each app
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
