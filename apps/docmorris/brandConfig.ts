import { BrandConfig, brandBaseConfigs } from '@repo/theme/brandConfig';

export const brandConfig: BrandConfig = {
  ...brandBaseConfigs.docmorris,
  logo: require('./assets/logo/docmorris.png'),
  ads: [
    require('./assets/ads/ad1.png'),
    require('./assets/ads/ad2.png'),
    require('./assets/ads/ad3.png'),
    require('./assets/ads/ad4.png'),
    require('./assets/ads/ad5.png'),
    require('./assets/ads/ad6.png'),
    require('./assets/ads/ad7.png'),
  ],
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
};
