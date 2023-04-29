import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';

import {type RouteNames} from '@navigation/routes';
import {type StackRoutesType} from '@navigation/types/common';

export interface SharedStackParamList extends ParamListBase {
  [RouteNames.SplashScreen]: undefined;
}

export type SharedStackNavigationProp<T extends keyof SharedStackParamList> =
  NativeStackNavigationProp<SharedStackParamList, T>;

export type SharedStackRouteProp<RouteName extends keyof SharedStackParamList> =
  RouteProp<SharedStackParamList, RouteName>;

export type SharedStackRoutesType = StackRoutesType<SharedStackParamList>;
