import React from 'react';
import {FlatList, type FlatListProps, type ListRenderItem} from 'react-native';

import {type IProduct} from '@features/sales/types/product';
import {scale, verticalScale} from '@utils/layout';

import ProductCard from './ProductCard';

type ProductSalesListProps<T> = {
  data: T[];
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>;

export default function ProductSalesList(
  props: ProductSalesListProps<IProduct>,
): JSX.Element {
  const {data, ...baseProps} = props;

  const renderItem: ListRenderItem<IProduct> = ({item, index}) => {
    return (
      <ProductCard
        flex={index !== 4 ? 1 : 0.5}
        style={{marginRight: index % 2 === 0 ? scale(12) : 0}}
        data={item}
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
