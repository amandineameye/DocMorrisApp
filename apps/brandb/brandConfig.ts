import { BrandConfig, brandBaseConfigs } from '@repo/theme'

export const brandConfig: BrandConfig = {
  ...brandBaseConfigs.brandb,
  logo: require('./assets/logo/brandb.png'),
  productImgs: [
    {
      id: 0,
      image: require('./assets/products/med1.png'),
    },
    {
      id: 1,
      image: require('./assets/products/med2.png'),
    },
    {
      id: 2,
      image: require('./assets/products/med3.png'),
    },
  ],
}
