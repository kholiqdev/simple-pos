import {type BluetoothDevice} from 'tp-react-native-bluetooth-printer';

export interface PrinterStore {
  printer: BluetoothDevice;
  actions: {
    setPrinter: (val: BluetoothDevice) => void;
    removePrinter: () => void;
  };
}
