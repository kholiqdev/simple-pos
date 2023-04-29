import '@localization/i18n';

import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigator from '@navigation/navigator';

export default function App(): JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </>
  );
}
