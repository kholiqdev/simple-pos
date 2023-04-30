import React from 'react';
import {Pressable} from 'react-native';

import {Text} from '@components/atoms';
import HStack, {type HStackProps} from '@components/atoms/HStack/HStack';
import {formatCurrency} from '@utils/currency';
import {verticalScale} from '@utils/layout';

type FloatingOrderButtonProps = {
  title: string;
  price: number;
  onPress?: () => void;
} & HStackProps;

export default React.memo(function FloatingOrderButton(
  props: FloatingOrderButtonProps,
): JSX.Element {
  const {title, price, onPress, ...baseProps} = props;

  return (
    <Pressable onPress={onPress}>
      <HStack
        my="xs"
        backgroundColor="buttonPrimaryBackground"
        justifyContent="space-between"
        px="xl"
        alignItems="center"
        style={{paddingVertical: verticalScale(15), borderRadius: 20}}
        {...baseProps}>
        <Text color="textTertiaryColor" fontSize={16} fontWeight="bold">
          {title}
        </Text>
        <Text color="textTertiaryColor" fontSize={16} fontWeight="bold">
          {formatCurrency(price)}
        </Text>
      </HStack>
    </Pressable>
  );
});
