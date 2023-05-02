import React from 'react';
import {Keyboard, SafeAreaView} from 'react-native';

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
      <SafeAreaView style={{flex: 1}}>
        <Box
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
            return false;
          }}
          px="s"
          backgroundColor="mainBackground"
          {...baseProps}>
          {children}
        </Box>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});
