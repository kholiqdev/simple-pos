import React from 'react';
import {type TextProps as RNTextProps} from 'react-native/types';

import {createText, type TextProps} from '@shopify/restyle';

import {type Theme} from '@theme/theme';

const BaseText = createText<Theme>();

type BaseTextProps = TextProps<Theme> & RNTextProps;

export default React.memo(function Text(props: BaseTextProps) {
  const {children, ...baseProps} = props;

  return (
    <BaseText color="textPrimaryColor" {...baseProps}>
      {children}
    </BaseText>
  );
});
