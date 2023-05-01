import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import {zustandStorage} from '@lib/storage';

import {type PrinterStore} from '../types/printer';

const initialState: Pick<PrinterStore, 'printer'> = {
  printer: {
    name: '',
    address: '',
  },
};

const usePrinterStore = create<PrinterStore>()(
  persist(
    set => ({
      ...initialState,
      actions: {
        setPrinter: device => {
          set({
            printer: device,
          });
        },
        removePrinter: () => {
          set({
            printer: {
              name: '',
              address: '',
            },
          });
        },
      },
    }),
    {
      name: 'printer-store',
      storage: createJSONStorage(() => zustandStorage),
      partialize: state => ({printer: state.printer}),
    },
  ),
);

export const usePrinterActions = (): PrinterStore['actions'] =>
  usePrinterStore(state => state.actions);

export const useGetPrinter = (): PrinterStore['printer'] =>
  usePrinterStore(state => state.printer, shallow);
