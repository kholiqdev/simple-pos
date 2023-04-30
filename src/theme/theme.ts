import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  color,
  type ColorProps,
  composeRestyleFunctions,
  createTheme,
  spacing,
  type SpacingProps,
} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  grayLight: '#EAEAEA',
  grayPrimary: '#999999',
  grayDark: '#666666',

  black: '#282828',
  whitePrimary: '#F0F2F3',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.whitePrimary,
    cardPrimaryBackground: palette.purplePrimary,
    cardSecondaryBackground: palette.white,
    cardTertiaryBackground: palette.grayPrimary,
    buttonPrimaryBackground: palette.black,
    buttonSecondaryBackground: palette.white,
    textPrimaryColor: palette.black,
    textSecondaryColor: palette.grayPrimary,
    textTertiaryColor: palette.white,
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

export type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme>;

export const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  color,
]);

export default theme;
