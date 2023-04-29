import React from 'react';

import {t as _} from 'i18next';

import {Box, Text} from '@components/atoms';

export default function SplashScreen(): JSX.Element {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="header" color="textPrimaryColor">
        {_('point_of_sale')}
      </Text>
    </Box>
  );
}
