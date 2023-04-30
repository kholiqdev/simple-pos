import SplashScreen from '@features/shared/screens/SplashScreen';
import {RouteNames} from '@navigation/routes';
import {type SharedStackRoutesType} from '@navigation/types/shared';

export const sharedStackRoutes: SharedStackRoutesType = [
  {
    name: RouteNames.SplashScreen,
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
];
