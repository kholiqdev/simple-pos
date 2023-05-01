import {type ProductInBasket} from './product';

export interface Transaction {
  id: number;
  date: string;
  total: number;
  products: ProductInBasket[];
}
export interface TransactionStore {
  transactions: Transaction[];
  actions: {
    addTransaction: (val: Transaction) => void;
  };
}
