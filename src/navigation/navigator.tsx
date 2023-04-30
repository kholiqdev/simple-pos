import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AppStack from '@navigation/stack';

export default function Navigator(): JSX.Element {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
