import * as React from 'react';

import {RouteNames} from '@navigation/routes';
import {
  type SharedStackParamList,
  type SharedStackRoutesType,
} from '@navigation/types/shared';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '@features/shared/screens/SplashScreen';

const Stack = createNativeStackNavigator<SharedStackParamList>();

const sharedStackRoutes: SharedStackRoutesType = [
  {
    name: RouteNames.SplashScreen,
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
];

export default function SharedStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteNames.SplashScreen}>
      {sharedStackRoutes.map(routes => (
        <Stack.Screen key={routes.name} {...routes} />
      ))}
    </Stack.Navigator>
  );
}
