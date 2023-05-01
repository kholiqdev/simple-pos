/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-lone-blocks */
import React from 'react';

import {BluetoothEscposPrinter} from 'tp-react-native-bluetooth-printer';

import {type ProductInBasket} from '@features/sales/types/product';
import {formatCurrency} from '@utils/currency';

const companyLogo =
  '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ROCnBH4koPVD+lNAekUEREAEQiWADzrH9OnTtzcB4Xz44Ydb+/btrUWLFtayZUtr2LChcwnRPWA7Jj0RAREQgZ0S+JGA3uk79U8REAEREIHgCaxevdr++te/uqNu3bp2yCGHWLdu3ax169bWrl075/aBH7WKCIiACIhAyQT0K1kyG/1HBERABAqawKpVq+yJJ55wB24dffv2dfsXENL169eXVbqge1+NEwERyIaABHQ29PRZERABESgQAvPnzzeOWrVqWa9evaxnz57uaNasmRPSBdJMNUMEREAEYiEgAR0LRp1EBERABAqDwLp16+yxxx6z559/3o466ijr16+f85nGIk14PBUREAEREAEzCWiNAhEQAREQgZ8Q+PLLL52Injp1qp144ol23HHHOSFN2DzFl/4JLr0gAiJQxghIQJexDldzRUAERCBVAmSp3bRpkz3yyCM2ceJEO/XUU23AgAHWuXNnF1M61fPofSIgAiJQaAQkoAutR9UeERABEYiZAEKa6B333nuvzZ071wYOHOgyjuIvLWt0zLB1OhEQgSAISEAH0U2qpAiIgAgkT4AMk5MnT7aFCxe6zLWDBg2ytm3byjc6+a5RDURABPJMYNc8X0+XEwEREAERCJgA1ug1a9bY/fffb3/4wx+coN66dWvALVLVRUAERCB9ArJAp89MnxABERCBMk/gq6++sgkTJriU4pdccomLIV2hQoUyz0UAREAEygYBWaDLRj+rlSIgAiIQOwFcOmbMmGE33XSTy2z4+eefx34NnVAEREAEfCQgAe1jr6hOIiACIhAIgW+//dYWLFhgN998s40ePdo+++yzQGquaoqACIhA5gTkwpE5O31SBERABERgG4Hvv//eli9fbsOGDXM8Bg8ebFWqVBEbERABEShYArJAF2zXqmEiIAIikD8CUai74cOH29ixY41ELCoiIAIiUKgEJKALtWfVLhEQARHIMwEs0StXrrQ777zTJV755ptv8lwDXU4EREAE8kNAAjo/nHUVERABESgTBBDRixcvtttvv93mzJlj+EiriIAIiEChEZCALrQeVXtEQAREIGECiObZs2fbiBEjXMxo3DtUREAERKCQCEhAF1Jvqi0iIAIi4AmBr7/+2l544QV7/PHHbcuWLZ7UStUQAREQgXgISEDHw1FnEQEREAER2IEAcaEffvhhe+edd1ykjh3+rT9FQAREIFgCEtDBdp0qLgIiIAJ+E4jC2yGiN23a5HdlVTsREAERSIOABHQasPRWERABERCB9AgQiWPSpEn2+uuvG5kLVURABESgEAhIQBdCL6oNIiACIuApATYQkp3wvvvus3Xr1nlaS1VLBERABNIjIAGdHi+9WwREQAREIE0CWJ5nzpxpr776qqzQabLT20VABPwkIAHtZ7+oViIgAiJQUATITDhmzBjbsGFDQbVLjREBESibBCSgy2a/q9UiIAIikFcCWKHfffddmzVrliJy5JW8LiYCIpALAhLQuaCqc4qACIiACPyEwNatW23cuHGGNVpFBERABEImIAEdcu+p7iIgAiIQEAGSq0yZMkWbCQPqM1VVBESgeAK7Ff+yXhWBzAnssssumX9YnxSBBAhUqFDBmjdvbvvss49lMn6Jd8xBxAkev/vuO/ecx+hvnmOBJbnI5s2b3f8TaGqil4TF6tWrbdGiRda4cWPbdVfZcBLtEF1cBEQgYwIS0Bmj0weLI1CuXDnbfffdi/uXXhMBbwlUqVLFhg4dam3atDHGcLoFYfjtt9864bzjI76/iGesr4Rz++STT2zlypUuGgX/4/UvvvjC/vGPf9jatWuddRYhXqiF9k6dOtUOP/xw23vvvQu1mWqXCIhAgRPYLqB32203O+CAA+zMM88MvsnclJYuXeo2q3Az871UqlTJsccik8nN26f2NWzY0Nq2bWuMJxURCIXAnnvuaa1atbKOHTvmZQKIQEZIcvzzn/90ohlR/f7779sHH3zgsvatWbPGPv7444LzF+b3efr06W7CIAEdyjdE9RQBEdiRgFM5LFliNTz44IPdseObQvo7Cto/atQodzMKQUBj/WLi8vOf/9z22muvkHCrriIgAhkQ4DcX0c5RuXJlq1u3rnXo0MH69u1rW7ZscW4OiOkJEybYggUL3FEobh9Y45ksrF+/3mrXrp2Ry0wGyPURERABEYiVgMyEseLUyURABEQgcwII68gfG5/s3r1727x58+yZZ56xN99809577z0nsDO/QvKfxMiBywq+0AceeKBWq/LQJTDnYPISPUa++dH/qAY+6ayC7viYyb6APDRLlxCBRAlIQCeKXxcXAREQgZIJsKmxW7duzi2KGMp33323TZs2zflRl/wp///zzTff2JIlS+yII46QgI6huxDBrLZ+9dVX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RDTuHJHvdipt1HtKJiABXTIb/UcEREAEMibATbVBgwZ2ySWX2JIlS2zOnDlBp8hmE9KiRYvsuuuuswceeMBq166dMZskPojrCZManwvChogw5513nu27774+VzXouhWdUGUqfvkcPvWsamCB9r1s2LDBOBQPPb6e8r/X42urziQCIiACeSXADbZjx45ORF911VX26aefBu0PvWXLFps6daoNHz7cfv/739s+++yTV56ZXgyxg7WwSpUqzlroa9QENnmxcbNixYq23377ZdpcfS5PBLA+MyljbPle2ATMfgwmwiHU13ee1E9ROELoJdVRBEQgWAJYPvv06WO/+MUvCiIiCkvBjz76qD355JNBJVlBNLDPIlOLYz4GIOIGP1WW2n0V+fngEMo1mCBXr149iO8144rY7kTjUImHgAR0PBx1FhEQAREolgCCDSvVkCFDnG9r6NYfhB034mHDhtmMGTOCWRJG7ODz6rNvMcvrWPlXr16tkGPFfpv8ehHXjVq1ank9piJijCu+t2xo1uQsopLdowR0dvz0aREQAREolQA+l422bb4jDBzhGkPwmdxZoxB6y5cvt2uuucaWbUu2EkKJrIU+C2g4Em4MX3Os0Sp+E+B7XLNmTefK5PPKBhQRzR9//LGtXbtWAjqmYSUBHRNInUYEREAEdkYAAdelSxfnD41F2vcb7s7awv/w1Z09e7bdcMMN3idZgTVih+V2/KB9LlgK4Rpy6EOf+cZZNybGkQtHCFZdJrsrVqzQ5CymQSABHRNInUYEREAESiOA9bNv37529tlnB+E3WVp7EHnjxo2zhx56yLkelPb+JP+P2EE8+745b+vWrbZgwQJbv369LIVJDpgUrk04PNyC8K1ngux7IQoHIppVDpXsCUhAZ89QZxABERCBlAhgCa1Ro4adf/75RkISdvGHXLC6kWTlv//7v238+PFeZ2NDQGP5b9q0qdfI2eTFMvtbb70lP2ive+qHyjEpI+RgCBk62Zz6wQcfOF9ohbPLfnBJQGfPUGcQAREQgZQJIOQaNmzoUn23bNkyeH9oRDTW0t/97nfu5uzrUjaTF8LuwZ4+8Ll8/vnn9vLLL8uNw+dO2lY3xhRxoBtt299A6EHfC6J52rRpNm/ePLlxxNBZfv+KxNBAnUIEREAEfCOAP26nTp3sP/7jP9wSMDfikAsb3lgavvLKK10E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';

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
      await BluetoothEscposPrinter.printPic(companyLogo, {
        width: 250,
        left: 150,
      });
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
