import { BrandConfig, brandBaseConfigs } from '@repo/theme/brandConfig';
import Logo from './assets/logo/docmorris.svg';

export const brandConfig: BrandConfig = {
  ...brandBaseConfigs.docmorris,
  logo: Logo,
  ads: [
    require('./assets/ads/test.png'),
    // require('./assets/ads/ad2.png'),
    // require('./assets/ads/ad3.png'),
    // require('./assets/ads/ad4.png'),
    // require('./assets/ads/ad5.png'),
    // require('./assets/ads/ad6.png'),
    // require('./assets/ads/ad7.png'),
  ],
};
