import React from 'react';
import {FlatList, type FlatListProps, type ListRenderItem} from 'react-native';

import ProductCard from '@features/sales/components/ProductCard';
import {useProductActions} from '@features/sales/store/product';
import {type Product} from '@features/sales/types/product';
import {scale, verticalScale} from '@utils/layout';

type ProductSalesListProps<T> = {
  data: T[];
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>;

export default function ProductSalesList(
  props: ProductSalesListProps<Product>,
): JSX.Element {
  const {data, ...baseProps} = props;

  const {addProductToBasket, decreaseProductQuantityInBasket} =
    useProductActions();

  const renderItem: ListRenderItem<Product> = ({item, index}) => {
    return (
      <ProductCard
        flex={index !== 4 ? 1 : 0.5}
        style={{marginRight: index % 2 === 0 ? scale(12) : 0}}
        data={item}
        onIncrement={() => {
          addProductToBasket(item);
        }}
        onDecrement={() => {
          decreaseProductQuantityInBasket(item.id);
        }}
      />
    );
  };

  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id.toString()}_${item.name}`}
      contentContainerStyle={{paddingBottom: 12}}
      columnWrapperStyle={{marginTop: verticalScale(12)}}
      renderItem={renderItem}
      {...baseProps}
    />
  );
}
