export interface ThemeType {
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
      medium: {
        fontFamily: string
        fontSize: number
        lineHeight: number
      }
      link: {
        fontFamily: string
        fontSize: number
        lineHeight: number
      }
    }

    caption: {
      '1': {
        regular: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
        medium: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
        strikethrough: {
          fontFamily: string
          fontSize: number
          lineHeight: number
          textDecorationLine: string
        }
      }
      '2': {
        regular: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
        medium: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      '4': {
        medium: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
    }
    body: {
      '1': {
        regular: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
        semiBold: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      '2': {
        medium: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      '3': {
        regular: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
        medium: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
    }

    title: {
      '1': {
        semiBold: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      '2': {
        semiBold: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      '3': {
        semiBold: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      '4': {
        bold: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
    }

    input: {
      text: {
        regular: {
          fontFamily: string
          fontSize: number
          lineHeight: number | undefined
        }
      }
      helperText: {
        regular: {
          fontFamily: string
          fontSize: number
          lineHeight: number
        }
      }
      label: {
        regular: {
          fontFamily: string
          fontSize: 10
          lineHeight: number | undefined
        }
      }
    }
  }
}
