import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {
  type Transaction,
  type TransactionStore,
} from '@features/sales/types/transaction';
import {zustandStorage} from '@lib/storage';

const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      actions: {
        addTransaction: (transaction: Transaction) => {
          const {transactions} = get();
          set({
            transactions: [...transactions, transaction],
          });
        },
      },
    }),
    {
      name: 'transaction-store',
      storage: createJSONStorage(() => zustandStorage),
      partialize: state => ({transactions: state.transactions}),
    },
  ),
);

export const useTransactionActions = (): TransactionStore['actions'] =>
  useTransactionStore(state => state.actions);

export const useGetTransactions = (): TransactionStore['transactions'] =>
  useTransactionStore(state => state.transactions);
