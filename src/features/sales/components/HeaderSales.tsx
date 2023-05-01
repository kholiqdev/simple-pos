import React from 'react';

import {type NavigationProp, useNavigation} from '@react-navigation/native';

import {HStack, IconMaterial} from '@components/atoms';
import {RouteNames} from '@navigation/routes';
import {type AppStackParamList} from '@navigation/types/app';

import CartCounter from './CartCounter';

interface HeaderSalesProps {
  data: {
    basketCount: number;
  };
}

export default React.memo(function HeaderSales(
  props: HeaderSalesProps,
): JSX.Element {
  const {data} = props;
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const navigateToConnectPrinterScreen = (): void => {
    navigation.navigate(RouteNames.ConnectPrinterScreen);
  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <IconMaterial
        name="printer"
        size={24}
        p="xs"
        onPress={navigateToConnectPrinterScreen}
      />
      <CartCounter count={data.basketCount} />
    </HStack>
  );
});
