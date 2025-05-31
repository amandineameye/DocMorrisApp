import 'styled-components'
import { Theme } from './src' // Make sure path is correct

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
