import React from 'react';

import {Gap, HStack, Text, VStack} from '@components/atoms';
import {type HStackProps} from '@components/atoms/HStack/HStack';
import {CounterButton} from '@components/molecules';
import {type ProductInBasket} from '@features/sales/types/product';
import {formatCurrency} from '@utils/currency';

import {useProductActions} from '../store/product';
import ProductImage from './ProductImage';

type ProductBasketCardProps = {
  item: ProductInBasket;
  onIncrement?: () => void;
  onDecrement?: () => void;
} & HStackProps;

export default React.memo(function ProductBasketCard(
  props: ProductBasketCardProps,
): JSX.Element {
  const {item, onIncrement, onDecrement, ...baseProps} = props;
  const {addProductToBasket, decreaseProductQuantityInBasket} =
    useProductActions();
  const {product, quantity} = item;
  return (
    <HStack
      width={'100%'}
      backgroundColor="cardSecondaryBackground"
      p="l"
      style={{borderRadius: 30}}
      {...baseProps}>
      <ProductImage
        source={{
          uri: 'https://hips.hearstapps.com/hmg-prod/images/blooming-quesadilla-ring-1674080631.jpeg',
        }}
        width={100}
        height={100}
      />
      <Gap width={10} />
      <VStack flex={1} justifyContent="space-around" pr="xl">
        <Text variant="body" fontWeight="600">
          {product.name}
        </Text>

        <Text variant="body" fontWeight="bold">
          {formatCurrency(product.price)}
        </Text>
        <CounterButton
          count={quantity}
          onIncrement={() => {
            addProductToBasket(product);
          }}
          onDecrement={() => {
            decreaseProductQuantityInBasket(product.id);
          }}
          alignSelf="flex-end"
        />
      </VStack>
    </HStack>
  );
});
