import React from 'react';
import {FlatList, type FlatListProps, type ListRenderItem} from 'react-native';

import {Box, Gap} from '@components/atoms';

import CategoryBadge from './CategoryBadge';

interface CategoryItemProps {
  id: number;
  name: string;
  iconName: string;
}

type CategoryBadgeListProps<T> = {
  data: CategoryItemProps[];
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>;

export default React.memo(function CategoryBadgeList(
  props: CategoryBadgeListProps<CategoryItemProps>,
): JSX.Element {
  const {data, ...baseProps} = props;
  const [selectedCategory, setSelectedCategory] = React.useState(1);

  const handleCategoryPress = React.useCallback(
    (id: number) => {
      setSelectedCategory(id);
    },
    [setSelectedCategory],
  );

  const renderItem: ListRenderItem<CategoryItemProps> = ({item}) => (
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
