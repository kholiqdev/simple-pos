import React from 'react';
import {FlatList, type ListRenderItem} from 'react-native';

import {t as _} from 'i18next';

import {Box, Gap, HStack, Text} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import {formatCurrency} from '@utils/currency';

import {useGetTransactions} from '../store/transaction';
import {type Transaction} from '../types/transaction';

export default function TransactionHistoryScreen(): JSX.Element {
  const transactions = useGetTransactions();

  const renderItem: ListRenderItem<Transaction> = ({item}) => {
    return (
      <Box
        key={item.id}
        backgroundColor="cardSecondaryBackground"
        p="s"
        borderRadius="m">
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Receipt #{item.id}</Text>
          <Text>{item.date}</Text>
        </HStack>
        <Gap height={12} />
        <HStack justifyContent="space-between">
          <Text>{_('total_items')}</Text>
          <Text>x{item.products.length}</Text>
          <Text>{formatCurrency(item.total)}</Text>
        </HStack>
      </Box>
    );
  };

  return (
    <BaseLayout>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Gap height={12} />}
        ListEmptyComponent={() => (
          <>
            <Gap height={40} />
            <Text textAlign="center">{_('no_transaction_history')}</Text>
          </>
        )}
      />
    </BaseLayout>
  );
}
