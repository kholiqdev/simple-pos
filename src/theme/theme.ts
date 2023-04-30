import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#282828',
  whitePrimary: '#FCFCFC',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.whitePrimary,
    cardPrimaryBackground: palette.purplePrimary,
    cardSecondaryBackground: palette.white,
    textPrimaryColor: palette.black,
  },
  spacing: {
    xs: 8,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      fontSize: 14,
      lineHeight: 18,
    },
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
});

export type Theme = typeof theme;
export default theme;
