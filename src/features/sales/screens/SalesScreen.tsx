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
  useGetProductCategories,
  useGetProducts,
  useProductInBasketTotalPrice,
  useProductsInBasketCount,
} from '@features/sales/store/product';
import {type Product} from '@features/sales/types/product';
import useFilter, {type Filter} from '@hooks/useFilter';
import {type Theme} from '@theme/theme';

const filterByCategory = (data: Product[], categoryId: number): Product[] => {
  if (categoryId === 0) {
    return data;
  }
  return data.filter(item => item.categoryId === categoryId);
};

export default function SalesScreen(): JSX.Element {
  const theme = useTheme<Theme>();
  const [filter, setFilter] = React.useState<Filter<Product>>({
    search: {
      query: '',
      field: ['name'],
    },
    sort: {
      field: 'id',
      order: 'asc',
    },
  });
  const [categoryFilter, setCategoryFilter] = React.useState<number>(1);

  const productCategories = useGetProductCategories();
  const products = useGetProducts();
  const productInBasketCount = useProductsInBasketCount();
  const productInBasketTotalPrice = useProductInBasketTotalPrice();

  const filteredProducts = filterByCategory(
    useFilter(products.length > 0 ? products : [], filter),
    categoryFilter,
  );

  const onSearch = (query: string): void => {
    const newFilter = {
      ...filter,
      search: {
        ...filter.search,
        query,
      },
    };
    setFilter(newFilter);
  };

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
        onChangeText={onSearch}
        value={filter.search.query}
      />
      <Gap height={12} />
      <CategoryBadgeList
        data={productCategories}
        onCategorySelected={setCategoryFilter}
      />
      <Gap height={12} />
      <ProductSalesList data={filteredProducts} />
      <FloatingOrderButton
        title={_('add_to_order')}
        price={productInBasketTotalPrice}
      />
    </BaseLayout>
  );
}
