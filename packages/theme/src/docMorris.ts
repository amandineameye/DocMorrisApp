import { ThemeType } from './types'

//Color names should be renamed with more descriptive names like "main", "accent" instead of "primary1".
export const docMorrisTheme: ThemeType = {
  colors: {
    primary: {
      primary1: '#00463D',
      primary2: '#00D264',
      background: '#FFFFFF',
    },
    secondary: {
      secondary1: '#343434',
      secondary2: '#535353',
      secondary3: '#727272',
      secondary4: '#D0D0D0',
      secondary5: '#EDEDED',
      secondary6: '#F2F2F2',
      secondary7: '#FAF8F8',
    },

    interferer: {
      interferer1: '#E6007E',
    },

    complementary: {
      success1: '#108455',
      success2: '#ABD4C4',
      success3: '#CFE6DD',
      success4: '#E7F3EE',
    },
  },

  fonts: {
    button: {
      medium: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 22,
      },
      link: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        lineHeight: 18,
      },
    },

    caption: {
      '1': {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          lineHeight: 18,
        },
        medium: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          lineHeight: 18,
        },
        strikethrough: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          lineHeight: 18,
          textDecorationLine: 'line-through',
        },
      },
      '2': {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          lineHeight: 15,
        },
        medium: {
          fontFamily: 'Poppins-Medium',
          fontSize: 10,
          lineHeight: 15,
        },
      },
      '4': {
        medium: {
          fontFamily: 'Poppins-Medium',
          fontSize: 6,
          lineHeight: 9,
        },
      },
    },
    body: {
      '1': {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
          lineHeight: 24,
        },
        semiBold: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 24,
        },
      },
      '2': {
        medium: {
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          lineHeight: 21,
        },
      },
      '3': {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 13,
          lineHeight: 24,
        },
        medium: {
          fontFamily: 'Poppins-Medium',
          fontSize: 13,
          lineHeight: 24,
        },
      },
    },

    title: {
      '1': {
        semiBold: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 28,
          lineHeight: 34,
        },
      },
      '2': {
        semiBold: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 18,
          lineHeight: 27,
        },
      },
      '3': {
        semiBold: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          lineHeight: 24,
        },
      },
      '4': {
        bold: {
          fontFamily: 'Poppins-Bold',
          fontSize: 13,
          lineHeight: 20,
        },
      },
    },

    input: {
      text: {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 18,
          lineHeight: undefined,
        },
      },
      helperText: {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          lineHeight: 18,
        },
      },
      label: {
        regular: {
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          lineHeight: undefined,
        },
      },
    },
  },
}
