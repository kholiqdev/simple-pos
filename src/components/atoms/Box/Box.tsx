import React from 'react';
import {type ViewProps} from 'react-native/types';

import {type BoxProps as RBoxProps, createBox} from '@shopify/restyle';

import {type Theme} from '@theme/theme';

const BaseBox = createBox<Theme>();

export type BoxProps = RBoxProps<Theme> & ViewProps;

export default React.memo(function Box(props: BoxProps) {
  const {children, ...baseProps} = props;

  return <BaseBox {...baseProps}>{children}</BaseBox>;
});
