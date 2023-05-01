import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Box} from '@components/atoms';
import {type BoxProps} from '@components/atoms/Box/Box';

type BaseLayoutProps = BoxProps;

export default React.memo(function BaseLayout(
  props: BaseLayoutProps,
): JSX.Element {
  const {children, ...baseProps} = props;

  return (
    <GestureHandlerRootView style={{flex: 1, padding: 0}}>
      <Box px="s" backgroundColor="mainBackground" {...baseProps}>
        {children}
      </Box>
    </GestureHandlerRootView>
  );
});
