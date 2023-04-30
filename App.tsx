import '@localization/i18n';

import React from 'react';

import {ThemeProvider} from '@shopify/restyle';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigator from '@navigation/navigator';
import theme from '@theme/theme';

export default function App(): JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
