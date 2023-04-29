import React from 'react';

import Navigator from '@navigation/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App(): JSX.Element {
  return (
    <>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </>
  );
}
