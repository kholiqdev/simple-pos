import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useTheme} from '@shopify/restyle';

import {Box, IconMaterial} from '@components/atoms';
import {type BoxProps} from '@components/atoms/Box/Box';
import {type Theme} from '@theme/theme';

type CategoryBadgeProps = {
  onPress: () => void;
  iconName: string;
  isSelected?: boolean;
} & BoxProps;

export default React.memo(function CategoryBadge(
  props: CategoryBadgeProps,
): JSX.Element {
  const {onPress, iconName, isSelected = false, ...baseProps} = props;

  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        borderWidth={isSelected ? 1 : 0}
        backgroundColor="cardSecondaryBackground"
        px="m"
        py="xs"
        borderRadius="xl"
        {...baseProps}>
        <IconMaterial
          name={iconName}
          size={24}
          color={
            isSelected
              ? theme.colors.textPrimaryColor
              : theme.colors.textSecondaryColor
          }
          onPress={onPress}
        />
      </Box>
    </TouchableOpacity>
  );
});
