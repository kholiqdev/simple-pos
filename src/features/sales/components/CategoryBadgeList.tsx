import React from 'react';
import {FlatList, type FlatListProps, type ListRenderItem} from 'react-native';

import {Box, Gap} from '@components/atoms';
import CategoryBadge from '@features/sales/components/CategoryBadge';
import {type ICategoryItem} from '@features/sales/types/category';

type CategoryBadgeListProps<T> = {
  data: T[];
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>;

export default React.memo(function CategoryBadgeList(
  props: CategoryBadgeListProps<ICategoryItem>,
): JSX.Element {
  const {data, ...baseProps} = props;
  const [selectedCategory, setSelectedCategory] = React.useState(1);

  const handleCategoryPress = React.useCallback(
    (id: number) => {
      setSelectedCategory(id);
    },
    [setSelectedCategory],
  );

  const renderItem: ListRenderItem<ICategoryItem> = ({item}) => (
    <CategoryBadge
      iconName={item.iconName}
      isSelected={selectedCategory === item.id}
      onPress={() => {
        handleCategoryPress(item.id);
      }}
    />
  );

  return (
    <Box>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id.toString()}_${item.name}`}
        ItemSeparatorComponent={() => <Gap width={12} />}
        renderItem={renderItem}
        {...baseProps}
      />
    </Box>
  );
});
