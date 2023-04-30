import React from 'react';
import {Pressable} from 'react-native';

import {useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Box, {type BoxProps} from '@components/atoms/Box/Box';
import {type Theme} from '@theme/theme';

export type IconMaterialProps = {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
} & BoxProps;

export default React.memo(function IconMaterial(props: IconMaterialProps) {
  const theme = useTheme<Theme>();
  const {
    testID,
    name,
    color = theme.colors.textPrimaryColor,
    size = 14,
    onPress,
    ...baseProps
  } = props;

  return (
    <Pressable onPress={onPress}>
      <Box testID={testID} {...baseProps}>
        <Icon name={name} size={size} color={color} />
      </Box>
    </Pressable>
  );
});
