import React from 'react';

import {IconMaterial} from '@components/atoms';
import OrderScreen from '@features/sales/screens/OrderScreen';
import SalesScreen from '@features/sales/screens/SalesScreen';
import {RouteNames} from '@navigation/routes';
import {type AppStackRoutesType} from '@navigation/types/app';
import theme from '@theme/theme';

export const appStackRoutes: AppStackRoutesType = [
  {
    name: RouteNames.SalesScreen,
    component: SalesScreen as React.ComponentType,
    options: {
      headerShown: false,
    },
  },
  {
    name: RouteNames.OrderScreen,
    component: OrderScreen as React.ComponentType,
    options: {
      headerShown: true,
      headerTitle: 'Order',
      headerLeft: () => <IconMaterial name="chevron-left" size={24} />,
      headerStyle: {
        backgroundColor: theme.colors.mainBackground,
      },
    },
  },
];
