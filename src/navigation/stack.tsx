import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RouteNames} from '@navigation/routes';
import {appStackRoutes} from '@navigation/stacks/AppStack';
import {sharedStackRoutes} from '@navigation/stacks/SharedStack';
import {type AppStackParamList} from '@navigation/types/app';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack(): JSX.Element {
  const isAuthUser = true;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        animation: 'fade_from_bottom',
      }}
      initialRouteName={RouteNames.SalesScreen}>
      {isAuthUser ? (
        <>
          <Stack.Group>
            {appStackRoutes.map(routes => (
              <Stack.Screen key={routes.name} {...routes} />
            ))}
          </Stack.Group>
        </>
      ) : null}
      <Stack.Group navigationKey={isAuthUser ? 'user' : 'guest'}>
        {sharedStackRoutes.map(routes => (
          <Stack.Screen key={routes.name} {...routes} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}
