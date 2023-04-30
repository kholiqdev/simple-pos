import React from 'react';

import {Gap, Text} from '@components/atoms';
import Box, {type BoxProps} from '@components/atoms/Box/Box';
import {CounterButton} from '@components/molecules';

import ProductImage from './ProductImage';

type ProductCardProps = {
  onIncrement?: () => void;
  onDecrement?: () => void;
  data: {
    id: number;
    name: string;
    price: number;
  };
} & BoxProps;

export default function ProductCard(props: ProductCardProps): JSX.Element {
  const {onIncrement, onDecrement, data, ...baseProps} = props;
  const {name, price} = data;
  return (
    <Box
      backgroundColor="cardSecondaryBackground"
      px="xs"
      py="m"
      borderRadius="l"
      flex={1}
      {...baseProps}>
      <ProductImage
        source={{
          uri: 'https://hips.hearstapps.com/hmg-prod/images/blooming-quesadilla-ring-1674080631.jpeg',
        }}
      />
      <Gap height={12} />
      <Text variant="body" fontWeight="600">
        {name}
      </Text>
      <Text variant="body" fontWeight="bold">
        Rp {price}
      </Text>
      <Gap height={12} />
      <CounterButton
        count={0}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </Box>
  );
}
