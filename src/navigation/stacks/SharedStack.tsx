import React from 'react';

import {IconMaterial} from '@components/atoms';
import ConnectPrinter from '@features/shared/screens/ConnectPrinter';
import SplashScreen from '@features/shared/screens/SplashScreen';
import {RouteNames} from '@navigation/routes';
import {type SharedStackRoutesType} from '@navigation/types/shared';
import theme from '@theme/theme';

export const sharedStackRoutes: SharedStackRoutesType = [
  {
    name: RouteNames.SplashScreen,
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: RouteNames.ConnectPrinterScreen,
    component: ConnectPrinter,
    options: {
      headerShown: true,
      headerTitle: 'Bluetooth Printer',
      headerLeft: () => <IconMaterial name="chevron-left" size={24} />,
      headerStyle: {
        backgroundColor: theme.colors.mainBackground,
      },
    },
  },
];
