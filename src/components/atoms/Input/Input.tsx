import React from 'react';
import {TextInput, type TextInputProps} from 'react-native';

import {useRestyle, useTheme} from '@shopify/restyle';

import {HStack} from '@components/atoms/HStack';
import {restyleFunctions, type RestyleProps, type Theme} from '@theme/theme';

type InputProps = {
  leftAddon?: string | JSX.Element;
  rightAddon?: string | JSX.Element;
} & RestyleProps &
  TextInputProps;

export default React.memo(function Input(props: InputProps): JSX.Element {
  const {leftAddon, rightAddon, ...baseProps} = useRestyle(
    restyleFunctions,
    props,
  );
  const theme = useTheme<Theme>();

  return (
    <HStack
      style={{borderRadius: 15}}
      backgroundColor="cardSecondaryBackground"
      alignItems="center"
      px="xs">
      {leftAddon}
      <TextInput
        placeholderTextColor={theme.colors.textSecondaryColor}
        {...baseProps}
        style={{
          flex: 1,
          color: theme.colors.textPrimaryColor,
        }}
        cursorColor={theme.colors.textSecondaryColor}
      />
      {rightAddon}
    </HStack>
  );
});
