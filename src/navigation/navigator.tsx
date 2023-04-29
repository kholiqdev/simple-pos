import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import SharedStack from '@navigation/stacks/SharedStack';

export default function Navigator(): JSX.Element {
  const isAuthUser = true;

  return (
    <NavigationContainer>
      {isAuthUser ? <SharedStack /> : <></>}
    </NavigationContainer>
  );
}
