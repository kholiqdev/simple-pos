import SalesScreen from '@features/sales/screens/SalesScreen';
import {RouteNames} from '@navigation/routes';
import {type AppStackRoutesType} from '@navigation/types/app';

export const appStackRoutes: AppStackRoutesType = [
  {
    name: RouteNames.SalesScreen,
    component: SalesScreen,
    options: {
      headerShown: false,
    },
  },
];
