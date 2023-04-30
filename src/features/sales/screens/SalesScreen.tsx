import React from 'react';

import {useTheme} from '@shopify/restyle';

import {Gap, HStack, IconMaterial, Input} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import {type Theme} from '@theme/theme';

import CartCounter from '../components/CartCounter';
import CategoryBadgeList from '../components/CategoryBadgeList';

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

export default function SalesScreen(): JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <BaseLayout flex={1} pt="s">
      <HStack justifyContent="space-between" alignItems="center">
        <IconMaterial name="menu" size={24} />
        <CartCounter count={2} />
      </HStack>
      <Gap height={12} />
      <Input
        placeholder="Search for products, brands and more"
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
    </BaseLayout>
  );
}
