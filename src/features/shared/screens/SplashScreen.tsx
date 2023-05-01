import React from 'react';

import {t as _} from 'i18next';

import {Box, Text} from '@components/atoms';
import {useGetPrinter} from '@features/shared/store/printer';
import usePrinter from '@hooks/usePrinter';
import {RouteNames} from '@navigation/routes';
import {type SplashScreenProps} from '@navigation/types/shared';

export default function SplashScreen(props: SplashScreenProps): JSX.Element {
  const {navigation} = props;
  const printerDevice = useGetPrinter();
  const {connect} = usePrinter();

  React.useEffect(() => {
    setTimeout(() => {
      if (printerDevice.name !== '') {
        void connect(printerDevice);
      }
      navigation.navigate(RouteNames.SalesScreen);
    }, 3000);
  }, []);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="header" color="textPrimaryColor">
        {_('point_of_sale')}
      </Text>
    </Box>
  );
}
