import * as React from 'react';

import SharedStack from '@navigation/stacks/SharedStack';
import {NavigationContainer} from '@react-navigation/native';

export default function Navigator(): JSX.Element {
  const isAuthUser = true;

  return (
    <NavigationContainer>
      {isAuthUser ? <SharedStack /> : <></>}
    </NavigationContainer>
  );
}
