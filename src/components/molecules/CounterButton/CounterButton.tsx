import React from 'react';

import {useTheme} from '@shopify/restyle';

import {Gap, HStack, IconMaterial, Text} from '@components/atoms';
import {type HStackProps} from '@components/atoms/HStack/HStack';
import {scale, verticalScale} from '@utils/layout';
import {type Theme} from '@theme/theme';

type CounterButtonProps = {
  count: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
} & HStackProps;

export default React.memo(function CounterButton(
  props: CounterButtonProps,
): JSX.Element {
  const theme = useTheme<Theme>();
  const {count, onIncrement, onDecrement, ...baseProps} = props;

  return (
    <HStack
      alignItems="center"
      backgroundColor={
        count > 0 ? 'textPrimaryColor' : 'cardTertiaryBackground'
      }
      borderRadius="l"
      justifyContent="space-between"
      style={{paddingVertical: verticalScale(3), paddingHorizontal: scale(5)}}
      {...baseProps}>
      <IconMaterial
        name="plus"
        size={20}
        onPress={onIncrement}
        color={theme.colors.textPrimaryColor}
        backgroundColor="textTertiaryColor"
        borderRadius="l"
      />
      <Gap width={5} />
      <Text variant="body" fontWeight="bold" color="textTertiaryColor">
        {count}
      </Text>
      <Gap width={5} />
      <IconMaterial
        name="minus"
        size={20}
        onPress={onDecrement}
        color={
          count > 0
            ? theme.colors.textPrimaryColor
            : theme.colors.textSecondaryColor
        }
        backgroundColor={'textTertiaryColor'}
        borderRadius="l"
      />
    </HStack>
  );
});
