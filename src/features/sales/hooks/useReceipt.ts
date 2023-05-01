/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-lone-blocks */
import React from 'react';

import {BluetoothEscposPrinter} from 'tp-react-native-bluetooth-printer';

import {formatCurrency} from '@utils/currency';

import {type ProductInBasket} from '../types/product';

export default function useReceipt(baskets: ProductInBasket[]): {
  printReceipt: () => Promise<void>;
} {
  const countSubTotal = React.useMemo(() => {
    return baskets.reduce((acc, curr) => {
      return acc + curr.product.price * curr.quantity;
    }, 0);
  }, [baskets]);

  const printReceipt = async (): Promise<void> => {
    const columnWidths = [8, 20, 20];
    try {
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
      // await BluetoothEscposPrinter.printPic(hsdLogo, {
      //   width: 250,
      //   left: 150,
      // });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['Jl. TB Simatupang No.18C, Cilandak'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [32],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['https://t-rec.id'],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Customer', 'Abdul Kholiq'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Cashier', 'Dinda Ayu'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Delivery', 'Ambil Sendiri'],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      await BluetoothEscposPrinter.printText('Products\r\n', {
        widthtimes: 1,
      });
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      {
        baskets.map(async product => {
          await BluetoothEscposPrinter.printColumn(
            columnWidths,
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            [
              `${product.quantity}x`,
              product.product.name,
              formatCurrency(product.product.price * product.quantity),
            ],
            {},
          );
        });
      }
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Subtotal', formatCurrency(countSubTotal)],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Packaging', 'Rp 0'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Delivery', 'Rp 0'],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [24, 24],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Total', formatCurrency(countSubTotal)],
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n\r\n', {});
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printQRCode(
        'DP0837849839',
        280,
        BluetoothEscposPrinter.ERROR_CORRECTION.L,
        0,
      );
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['DP0837849839'],
        {widthtimes: 2},
      );
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [48],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['Sabtu, 1 May 2023 - 06:00 WIB'],
        {},
      );
      await BluetoothEscposPrinter.printText(
        '================================================',
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    } catch (e) {
      console.warn(e);
    }
  };
  return {printReceipt};
}
