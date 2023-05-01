/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import {FlatList, type ListRenderItem, ToastAndroid} from 'react-native';

import {t as _} from 'i18next';

import {
  Box,
  Gap,
  HStack,
  IconMaterial,
  Input,
  Text,
  VStack,
} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import {
  FloatingOrderButton,
  ProductBasketCard,
} from '@features/sales/components';
import useReceipt from '@features/sales/hooks/useReceipt';
import {
  useProductActions,
  useProductInBasketTotalPrice,
  useProductsInBasket,
  useProductsInBasketCount,
} from '@features/sales/store/product';
import {useTransactionActions} from '@features/sales/store/transaction';
import {type ProductInBasket} from '@features/sales/types/product';
import useBottomSheet from '@hooks/useBottomSheet';
import {formatCurrency, formatCurrencyTextInput} from '@utils/currency';
import {safeParseInt} from '@utils/generic';
import {RouteNames} from '@navigation/routes';
import {type OrderScreenProps} from '@navigation/types/app';
import theme from '@theme/theme';

export default function OrderScreen(props: OrderScreenProps): JSX.Element {
  const {navigation} = props;
  const [money, setMoney] = React.useState<string>('0');
  const [moneyChange, setMoneyChange] = React.useState<number>(0);

  const {addTransaction} = useTransactionActions();

  const {resetAllProductsInBasket} = useProductActions();
  const productInBasket = useProductsInBasket();
  const productInBasketCount = useProductsInBasketCount();
  const productInBasketTotalPrice = useProductInBasketTotalPrice();
  const {printReceipt} = useReceipt(productInBasket);

  const onChangeMoney = (value: string): void => {
    const parsedNumber = safeParseInt(value);
    if (parsedNumber > 0) {
      setMoney(value);
      setMoneyChange(parsedNumber - productInBasketTotalPrice);
    } else {
      setMoney('0');
    }
  };

  const renderItem: ListRenderItem<ProductInBasket> = ({item}) => (
    <ProductBasketCard item={item} />
  );

  const renderItemBasket: ListRenderItem<ProductInBasket> = ({item}) => (
    <HStack
      key={item.product.id.toString()}
      justifyContent="space-between"
      alignItems="center"
      marginBottom="s">
      <VStack>
        <Text variant="body" color="textPrimaryColor">
          {item.product.name}
        </Text>
        <Text variant="body" color="textPrimaryColor">
          {formatCurrency(item.product.price)}
        </Text>
      </VStack>
      <Text variant="body" color="textPrimaryColor">
        x{item.quantity}
      </Text>
      <Text variant="body" fontWeight="bold" color="textPrimaryColor">
        {formatCurrency(item.product.price * item.quantity)}
      </Text>
    </HStack>
  );

  const {ref: bottomSheetRef, component: bottomSheetComponent} = useBottomSheet(
    {
      childrenComponent: (
        <Box p="xs" flex={1}>
          <Text variant="body" fontWeight="bold" color="textPrimaryColor">
            {productInBasketCount} Item
          </Text>
          <FlatList
            keyExtractor={item => item.product.id.toString()}
            data={productInBasket}
            renderItem={renderItemBasket}
          />
          <Gap height={12} />
          <HStack
            justifyContent="space-between"
            alignItems="center"
            borderTopWidth={1}
            paddingTop="m">
            <Text variant="body" color="textPrimaryColor">
              {_('subtotal').toUpperCase()}
            </Text>
            <Text variant="body" fontWeight="bold" color="textPrimaryColor">
              {formatCurrency(productInBasketTotalPrice)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text variant="body" color="textPrimaryColor">
              {_('money_change').toUpperCase()}
            </Text>
            <Text variant="body" fontWeight="bold" color="textPrimaryColor">
              {formatCurrency(moneyChange)}
            </Text>
          </HStack>
          <Gap height={20} />
          <Input
            placeholder={_('input_money_amount')}
            leftAddon={
              <IconMaterial
                name="cash"
                size={24}
                color={theme.colors.textSecondaryColor}
              />
            }
            backgroundColor="mainBackground"
            keyboardType="phone-pad"
            onChangeText={onChangeMoney}
            value={formatCurrencyTextInput(money)}
          />
          <FloatingOrderButton
            title={_('pay_now')}
            // eslint-disable-next-line no-void
            onPress={() => void handlePay()}
          />
        </Box>
      ),
      snapPoints: ['100%'],
      index: -1,
    },
  );

  const handlePay = async (): Promise<void> => {
    try {
      if (
        (moneyChange < 0 && safeParseInt(money) > 0) ||
        (moneyChange === 0 && safeParseInt(money) === 0)
      ) {
        ToastAndroid.show(_('money_not_enough'), ToastAndroid.SHORT);
      } else {
        await printReceipt();

        addTransaction({
          id: new Date().getTime(),
          date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          products: productInBasket,
          total: productInBasketTotalPrice,
        });
        resetAllProductsInBasket();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleCheckout = (): void => {
    try {
      bottomSheetRef.current?.snapToIndex(0);
    } catch (error) {
      console.warn(error);
    }
  };

  React.useEffect(() => {
    if (productInBasketCount === 0) {
      navigation.navigate(RouteNames.SalesScreen);
    }
  }, [productInBasketCount, navigation]);

  return (
    <BaseLayout flex={1}>
      <FlatList
        data={productInBasket}
        keyExtractor={item =>
          `${item.product.id.toString()}_${item.product.name}_${item.quantity}`
        }
        ItemSeparatorComponent={() => <Gap height={10} />}
        renderItem={renderItem}
      />
      <FloatingOrderButton
        title={_('pay_now')}
        price={productInBasketTotalPrice}
        onPress={handleCheckout}
      />
      {bottomSheetComponent}
    </BaseLayout>
  );
}
