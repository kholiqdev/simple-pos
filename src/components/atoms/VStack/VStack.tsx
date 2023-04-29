import React from 'react';
import {type ViewProps} from 'react-native/types';

import {type BoxProps, createBox} from '@shopify/restyle';

import {type Theme} from '@theme/theme';

const Box = createBox<Theme>();

type VStackProps = BoxProps<Theme> & ViewProps;

export default React.memo(function VStack(props: VStackProps) {
  const {children, ...baseProps} = props;

  return (
    <Box flexDirection="column" {...baseProps}>
      {children}
    </Box>
  );
});
