import React from 'react';
import {type ViewProps} from 'react-native/types';

import {type BoxProps, createBox} from '@shopify/restyle';

import {type Theme} from '@theme/theme';

const BaseBox = createBox<Theme>();

type BaseBoxProps = BoxProps<Theme> & ViewProps;

export default React.memo(function Box(props: BaseBoxProps) {
  const {children, ...baseProps} = props;

  return <BaseBox {...baseProps}>{children}</BaseBox>;
});
