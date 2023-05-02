import React from 'react';
import {TextInput, type TextInputProps} from 'react-native';

import {useTheme} from '@shopify/restyle';

import {HStack} from '@components/atoms/HStack';
import {verticalScale} from '@utils/layout';
import {type Theme} from '@theme/theme';

import {type BoxProps} from '../Box/Box';

type InputProps = {
  leftAddon?: string | JSX.Element;
  rightAddon?: string | JSX.Element;
} & BoxProps &
  TextInputProps;

export default React.memo(function Input(props: InputProps): JSX.Element {
  const theme = useTheme<Theme>();
  const {
    leftAddon,
    rightAddon,
    placeholderTextColor = theme.colors.textSecondaryColor,
    ...baseProps
  } = props;

  return (
    <HStack
      style={{borderRadius: 15}}
      alignItems="center"
      height={verticalScale(40)}
      px="xs"
      {...baseProps}>
      {leftAddon}
      <TextInput
        placeholderTextColor={placeholderTextColor}
        style={{
          flex: 1,
          color: theme.colors.textPrimaryColor,
        }}
        cursorColor={theme.colors.textSecondaryColor}
        {...(props as Omit<TextInputProps, keyof typeof props>)}
      />
      {rightAddon}
    </HStack>
  );
});
