import 'styled-components/native'

type FontStyle = {
  fontFamily: string
  fontSize: number
  lineHeight?: number
  textDecorationLine?: 'line-through'
}

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: {
        primary1: string
        primary2: string
        background: string
      }
      secondary: {
        secondary1: string
        secondary2: string
        secondary3: string
        secondary4: string
        secondary5: string
        secondary6: string
        secondary7: string
      }
      interferer: {
        interferer1: string
      }
      complementary: {
        success1: string
        success2: string
        success3: string
        success4: string
      }
    }

    fonts: {
      button: {
        medium: FontStyle
        link: FontStyle
      }
      caption: {
        '1': {
          regular: FontStyle
          medium: FontStyle
          strikethrough: FontStyle
        }
        '2': {
          regular: FontStyle
          medium: FontStyle
        }
        '4': {
          medium: FontStyle
        }
      }
      body: {
        '1': {
          regular: FontStyle
          semiBold: FontStyle
        }
        '2': {
          medium: FontStyle
        }
        '3': {
          regular: FontStyle
          medium: FontStyle
        }
      }
      titel: {
        '1': {
          semiBold: FontStyle
        }
        '2': {
          semiBold: FontStyle
        }
        '3': {
          semiBold: FontStyle
        }
        '4': {
          bold: FontStyle
        }
      }
      input: {
        text: {
          regular: FontStyle
        }
        helperText: {
          regular: FontStyle
        }
        label: {
          regular: FontStyle
        }
      }
    }
  }
}
