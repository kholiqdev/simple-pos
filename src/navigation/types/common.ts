import {
  type DefaultNavigatorOptions,
  type ParamListBase,
  type RouteConfig,
  type StackNavigationState,
} from '@react-navigation/native';
import {
  type NativeStackNavigationEventMap,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// Stack navigator options
export type NativeStackNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >;

// Stack routes type
export type StackRoutesType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap
  >
>;
