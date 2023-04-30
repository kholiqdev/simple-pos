import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {type RouteNames} from '@navigation/routes';
import {type StackRoutesType} from '@navigation/types/common';

export interface AppStackParamList extends ParamListBase {
  [RouteNames.SplashScreen]: undefined;
  [RouteNames.SalesScreen]: undefined;
}

export type AppStackNavigationProp<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export type AppStackRouteProp<RouteName extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, RouteName>;

export type AppStackRoutesType = StackRoutesType<AppStackParamList>;
