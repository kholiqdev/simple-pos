import React from 'react';
import {type ViewProps} from 'react-native/types';

import {type BoxProps, createBox} from '@shopify/restyle';

import {type Theme} from '@theme/theme';

const Box = createBox<Theme>();

export type HStackProps = BoxProps<Theme> & ViewProps;

export default React.memo(function HStack(props: HStackProps) {
  const {children, ...baseProps} = props;

  return (
    <Box flexDirection="row" {...baseProps}>
      {children}
    </Box>
  );
});
