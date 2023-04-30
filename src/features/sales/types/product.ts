export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductInBasket {
  product: Product;
  quantity: number;
}

export interface ProductStore {
  productsInBasket: ProductInBasket[];
  actions: {
    addProductToBasket: (val: Product) => void;
    removeProductFromBasket: (productId: number) => void;
    increaseProductQuantityInBasket: (productId: number) => void;
    decreaseProductQuantityInBasket: (productId: number) => void;
    resetAllProductsInBasket: () => void;
  };
}
