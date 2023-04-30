import {create} from 'zustand';
import {shallow} from 'zustand/shallow';

import {type ProductStore} from '../types/product';

const useProductStore = create<ProductStore>((set, get) => ({
  productsInBasket: [],
  actions: {
    addProductToBasket: product => {
      const {productsInBasket} = get();
      const productInBasket = productsInBasket.find(
        p => p.product.id === product.id,
      );
      if (productInBasket !== undefined) {
        set({
          productsInBasket: productsInBasket.map(p => {
            if (p.product.id === product.id) {
              return {
                ...p,
                quantity: p.quantity + 1,
              };
            }
            return p;
          }),
        });
      } else {
        set({
          productsInBasket: [
            ...productsInBasket,
            {
              product,
              quantity: 1,
            },
          ],
        });
      }
    },
    removeProductFromBasket: productId => {
      const {productsInBasket} = get();
      set({
        productsInBasket: productsInBasket.filter(
          p => p.product.id !== productId,
        ),
      });
    },
    increaseProductQuantityInBasket: productId => {
      const {productsInBasket} = get();
      set({
        productsInBasket: productsInBasket.map(p => {
          if (p.product.id === productId) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        }),
      });
    },
    decreaseProductQuantityInBasket: productId => {
      const {productsInBasket} = get();
      set({
        productsInBasket: productsInBasket
          .map(p => {
            if (p.product.id === productId) {
              return {
                ...p,
                quantity: p.quantity - 1,
              };
            }
            return p;
          })
          .filter(p => p.quantity > 0),
      });
    },
    resetAllProductsInBasket: () => {
      set({
        productsInBasket: [],
      });
    },
  },
}));

export const useProductActions = (): ProductStore['actions'] =>
  useProductStore(state => state.actions);

export const useProductsInBasket = (): ProductStore['productsInBasket'] =>
  useProductStore(state => state.productsInBasket, shallow);
export const useProductsInBasketCount = (): number =>
  useProductStore(state => state.productsInBasket.length);
export const useProductInBasketQuantityById = (productId: number): number =>
  useProductStore(
    state =>
      state.productsInBasket.find(
        productInBasket => productInBasket.product.id === productId,
      )?.quantity ?? 0,
  );
export const useProductInBasketTotalPrice = (): number => {
  const productsInBasket = useProductsInBasket();
  return productsInBasket.reduce(
    (total, productInBasket) =>
      total + productInBasket.product.price * productInBasket.quantity,
    0,
  );
};
