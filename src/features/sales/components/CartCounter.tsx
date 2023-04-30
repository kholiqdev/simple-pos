import React from 'react';
import {Pressable} from 'react-native';

import {useTheme} from '@shopify/restyle';

import {Box, HStack, IconMaterial, Text} from '@components/atoms';
import {type HStackProps} from '@components/atoms/HStack/HStack';
import {type Theme} from '@theme/theme';

type CartCounterProps = {
  count: number;
  onPress?: () => void;
} & HStackProps;

export default React.memo(function CartCounter(
  props: CartCounterProps,
): JSX.Element {
  const theme = useTheme<Theme>();
  const {children, count, onPress, ...baseProps} = props;
  return (
    <Pressable onPress={onPress}>
      <HStack
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: theme.colors.cardSecondaryBackground,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 15,
        }}
        {...baseProps}>
        <Box
          backgroundColor="textPrimaryColor"
          width={20}
          height={20}
          style={{borderRadius: 15}}
          justifyContent="center"
          alignItems="center"
          mr="xs">
          <Text color="mainBackground" fontWeight="700">
            {count}
          </Text>
        </Box>
        <IconMaterial name="cart" size={20} />
      </HStack>
    </Pressable>
  );
});
