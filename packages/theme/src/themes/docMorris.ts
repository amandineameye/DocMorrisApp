import { ThemeType } from "@repo/theme/themes/types";

export const docMorrisTheme: ThemeType = {
  colors: {
    primary: {
      primary1: "#00463D",
      primary2: "#00D264",
      background: "#FFFFFF",
    },
    secondary: {
      secondary1: "#343434",
      secondary2: "#535353",
      secondary3: "#727272",
      secondary4: "#D0D0D0",
      secondary5: "#EDEDED",
      secondary6: "#F2F2F2",
      secondary7: "#FAF8F8",
    },

    interferer: {
      interferer1: "#E6007E",
    },

    complementary: {
      success1: "#108455",
      success2: "#ABD4C4",
      success3: "#CFE6DD",
      success4: "#E7F3EE",
    },
  },

  fonts: {
    button: {
      medium: {
        fontFamily: "Poppins",
        fontSize: 14,
        lineHeight: 22,
        fontWeight: "500",
      },
      link: {
        fontFamily: "Poppins",
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "500",
      },
    },

    caption: {
      "1": {
        regular: {
          fontFamily: "Poppins",
          fontSize: 12,
          lineHeight: 18,
          fontWeight: "400",
        },
        medium: {
          fontFamily: "Poppins",
          fontSize: 12,
          lineHeight: 18,
          fontWeight: "500",
        },
        strikethrough: {
          fontFamily: "Poppins",
          fontSize: 12,
          lineHeight: 18,
          textDecorationLine: "line-through",
          fontWeight: "400",
        },
      },
      "2": {
        regular: {
          fontFamily: "Poppins",
          fontSize: 10,
          lineHeight: 15,
          fontWeight: "400",
        },
        medium: {
          fontFamily: "Poppins",
          fontSize: 10,
          lineHeight: 15,
          fontWeight: "500",
        },
      },
      "4": {
        medium: {
          fontFamily: "Poppins",
          fontSize: 6,
          lineHeight: 9,
          fontWeight: "500",
        },
      },
    },
    body: {
      "1": {
        regular: {
          fontFamily: "Poppins",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "400",
        },
        semiBold: {
          fontFamily: "Poppins",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "600",
        },
      },
      "2": {
        medium: {
          fontFamily: "Poppins",
          fontSize: 14,
          lineHeight: 21,
          fontWeight: "500",
        },
      },
      "3": {
        regular: {
          fontFamily: "Poppins",
          fontSize: 13,
          lineHeight: 24,
          fontWeight: "400",
        },
        medium: {
          fontFamily: "Poppins",
          fontSize: 13,
          lineHeight: 24,
          fontWeight: "500",
        },
      },
    },

    title: {
      "1": {
        semiBold: {
          fontFamily: "Poppins",
          fontSize: 28,
          lineHeight: 34,
          fontWeight: "600",
        },
      },
      "2": {
        semiBold: {
          fontFamily: "Poppins",
          fontSize: 18,
          lineHeight: 27,
          fontWeight: "600",
        },
      },
      "3": {
        semiBold: {
          fontFamily: "Poppins",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "600",
        },
      },
      "4": {
        bold: {
          fontFamily: "Poppins",
          fontSize: 13,
          lineHeight: 20,
          fontWeight: "700",
        },
      },
    },

    input: {
      text: {
        regular: {
          fontFamily: "Poppins",
          fontSize: 18,
          lineHeight: undefined,
          fontWeight: "400",
        },
      },
      helperText: {
        regular: {
          fontFamily: "Poppins",
          fontSize: 12,
          lineHeight: 18,
          fontWeight: "400",
        },
      },
      label: {
        regular: {
          fontFamily: "Poppins",
          fontSize: 10,
          lineHeight: undefined,
          fontWeight: "400",
        },
      },
    },
  },
};
