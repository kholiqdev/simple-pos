import {ConnectPrinterScreen, SplashScreen} from '@features/shared/screens';
import {RouteNames} from '@navigation/routes';
import {type SharedStackRoutesType} from '@navigation/types/shared';
import theme from '@theme/theme';

export const sharedStackRoutes: SharedStackRoutesType = [
  {
    name: RouteNames.SplashScreen,
    component: SplashScreen as React.ComponentType,
    options: {
      headerShown: false,
    },
  },
  {
    name: RouteNames.ConnectPrinterScreen,
    component: ConnectPrinterScreen,
    options: {
      headerShown: true,
      headerTitle: 'Bluetooth Printer',
      headerStyle: {
        backgroundColor: theme.colors.mainBackground,
      },
    },
  },
];
