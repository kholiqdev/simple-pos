import React from 'react';

import {useTheme} from '@shopify/restyle';
import {t as _} from 'i18next';

import {Gap, HStack, IconMaterial, Input} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import {
  CartCounter,
  CategoryBadgeList,
  FloatingOrderButton,
  ProductSalesList,
} from '@features/sales/components';
import {
  useProductInBasketTotalPrice,
  useProductsInBasketCount,
} from '@features/sales/store/product';
import {type Theme} from '@theme/theme';

const productCategories = [
  {
    id: 1,
    name: 'Food & Groceries',
    iconName: 'food',
  },
  {
    id: 2,
    name: 'Drinks & Beverages',
    iconName: 'glass-cocktail',
  },
];

const products = [
  {
    id: 1,
    name: 'Chicken',
    price: 10000,
  },
  {
    id: 2,
    name: 'Beef',
    price: 20000,
  },
  {
    id: 3,
    name: 'Pork',
    price: 30000,
  },
  {
    id: 4,
    name: 'Fish',
    price: 40000,
  },
];

export default function SalesScreen(): JSX.Element {
  const theme = useTheme<Theme>();
  const productInBasketCount = useProductsInBasketCount();
  const productInBasketTotalPrice = useProductInBasketTotalPrice();

  return (
    <BaseLayout flex={1} pt="s">
      <HStack justifyContent="space-between" alignItems="center">
        <IconMaterial name="menu" size={24} />
        <CartCounter count={productInBasketCount} />
      </HStack>
      <Gap height={12} />
      <Input
        placeholder={_('search_for_products_brands_and_more')}
        leftAddon={
          <IconMaterial
            name="magnify"
            size={24}
            color={theme.colors.textSecondaryColor}
          />
        }
      />
      <Gap height={12} />
      <CategoryBadgeList data={productCategories} />
      <Gap height={12} />
      <ProductSalesList data={products} />
      <FloatingOrderButton
        title={_('add_to_order')}
        price={productInBasketTotalPrice}
      />
    </BaseLayout>
  );
}
