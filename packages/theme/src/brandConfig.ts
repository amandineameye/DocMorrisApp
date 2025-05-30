import { docMorrisTheme } from './themes/docMorris'
import { brandBTheme } from './themes/brandB'
import { ThemeType } from './themes/types'

export type BrandId = 'docmorris' | 'brandb'

export interface BrandConfig {
  name: string
  logo: any // handled by each app
  ads: any[] // handled by each app
  theme: ThemeType
  productImgs: { id: number; image: any }[]
}

export const brandBaseConfigs: Record<
  BrandId,
  Omit<BrandConfig, 'ads' | 'logo' | 'productImgs'>
> = {
  docmorris: {
    name: 'DocMorris',
    theme: docMorrisTheme,
  },
  brandb: {
    name: 'BrandB',
    theme: brandBTheme,
  },
}
