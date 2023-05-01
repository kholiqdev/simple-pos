import {TransactionHistoryScreen} from '@features/sales/screens';
import OrderScreen from '@features/sales/screens/OrderScreen';
import SalesScreen from '@features/sales/screens/SalesScreen';
import {RouteNames} from '@navigation/routes';
import {type AppStackRoutesType} from '@navigation/types/app';
import theme from '@theme/theme';

import type React from 'react';

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
      headerStyle: {
        backgroundColor: theme.colors.mainBackground,
      },
    },
  },
  {
    name: RouteNames.TransactionHistoryScreen,
    component: TransactionHistoryScreen as React.ComponentType,
    options: {
      headerShown: true,
      headerTitle: 'Transaction History',
      headerStyle: {
        backgroundColor: theme.colors.mainBackground,
      },
    },
  },
];
