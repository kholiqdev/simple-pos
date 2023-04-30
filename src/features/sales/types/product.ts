import {type Category} from '@features/sales/types/category';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  description: string;
}

export interface ProductInBasket {
  product: Product;
  quantity: number;
}

export interface ProductStore {
  productsInBasket: ProductInBasket[];
  products: Product[];
  productCategories: Category[];
  actions: {
    addProductToBasket: (val: Product) => void;
    removeProductFromBasket: (productId: number) => void;
    increaseProductQuantityInBasket: (productId: number) => void;
    decreaseProductQuantityInBasket: (productId: number) => void;
    resetAllProductsInBasket: () => void;
  };
}
