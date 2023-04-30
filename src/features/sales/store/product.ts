import productsJson from '@data/product.json';
import productCategoriesJson from '@data/product-category.json';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import {type Category} from '@features/sales/types/category';
import {type Product, type ProductStore} from '@features/sales/types/product';
import {zustandStorage} from '@lib/storage';

const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      productsInBasket: [],
      products: productsJson as Product[],
      productCategories: productCategoriesJson as Category[],
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
    }),
    {
      name: 'products-store',
      storage: createJSONStorage(() => zustandStorage),
      partialize: state => ({products: state.products}),
    },
  ),
);

export const useProductActions = (): ProductStore['actions'] =>
  useProductStore(state => state.actions);

export const useGetProducts = (): ProductStore['products'] =>
  useProductStore(state => state.products, shallow);

export const useGetProductCategories = (): ProductStore['productCategories'] =>
  useProductStore(state => state.productCategories, shallow);

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
