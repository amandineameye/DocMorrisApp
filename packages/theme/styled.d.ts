import "styled-components/native";

export type Font = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number | undefined;
  fontWeight: string;
};

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: {
        primary1: string;
        primary2: string;
        background: string;
      };
      secondary: {
        secondary1: string;
        secondary2: string;
        secondary3: string;
        secondary4: string;
        secondary5: string;
        secondary6: string;
        secondary7: string;
      };
      interferer: {
        interferer1: string;
      };
      complementary: {
        success1: string;
        success2: string;
        success3: string;
        success4: string;
      };
    };
    fonts: {
      button: {
        medium: Font;
        link: Font;
      };

      caption: {
        "1": {
          regular: Font;
          medium: Font;
          strikethrough: {
            fontFamily: string;
            fontSize: number;
            lineHeight: number;
            textDecorationLine: string;
            fontWeight: string;
          };
        };
        "2": {
          regular: Font;
          medium: Font;
        };
        "4": {
          medium: Font;
        };
      };
      body: {
        "1": {
          regular: Font;
          semiBold: Font;
        };
        "2": {
          medium: Font;
        };
        "3": {
          regular: Font;
          medium: Font;
        };
      };

      title: {
        "1": {
          semiBold: Font;
        };
        "2": {
          semiBold: Font;
        };
        "3": {
          semiBold: Font;
        };
        "4": {
          bold: Font;
        };
      };

      input: {
        text: {
          regular: Font;
        };
        helperText: {
          regular: Font;
        };
        label: {
          regular: Font;
        };
      };
    };
  }
}
