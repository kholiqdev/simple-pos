/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';

import {t as _} from 'i18next';
import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';
import {
  type BluetoothDevice,
  BluetoothManager,
} from 'tp-react-native-bluetooth-printer';

import {usePrinterActions} from '@features/shared/store/printer';

interface usePrinterProps {
  bleOpend: boolean;
  isLoading: boolean;
  name: string;
  pairedDevices: BluetoothDevice[];
  boundAddress: string;
  connect: (row: BluetoothDevice) => Promise<void>;
  unPair: (address: BluetoothDevice['address']) => void;
  scanBluetoothDevice: () => Promise<void>;
}

export default function usePrinter(): usePrinterProps {
  const [pairedDevices, setPairedDevices] = React.useState<BluetoothDevice[]>(
    [],
  );
  const [foundDs, setFoundDs] = React.useState([]);
  const [bleOpend, setBleOpend] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const [boundAddress, setBoundAddress] = React.useState('');

  const {setPrinter, removePrinter} = usePrinterActions();

  const deviceAlreadPaired = React.useCallback(
    (rsp: {devices: BluetoothDevice[]}) => {
      let ds: BluetoothDevice[] = [];
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices) as BluetoothDevice[];
        } catch (e) {}
      }
      if (ds.length > 0) {
        let pared: BluetoothDevice[] = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = React.useCallback(
    (rsp: {device: string}) => {
      let r: {address: any} | null = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r != null) {
        const found = foundDs || [];
        if (found.findIndex) {
          const duplicated = found.findIndex(function (x) {
            return x.address === r.address;
          });
          if (duplicated === -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = async (row: BluetoothDevice): Promise<void> => {
    setIsLoading(true);
    try {
      await BluetoothManager.connect(row.address);

      setIsLoading(false);
      setBoundAddress(row.address);
      setName(row.name);
      setPrinter(row);

      ToastAndroid.show(
        _('pairing_success_notification', {name: row.name}),
        ToastAndroid.SHORT,
      );
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show(
        _('pairing_failed_notification', {name: row.name}),
        ToastAndroid.SHORT,
      );
      console.warn(error);
    }
  };

  const unPair = (address: any) => {
    setIsLoading(true);
    BluetoothManager.unpair(address).then(
      (s: any) => {
        setIsLoading(false);
        setBoundAddress('');
        setName('');
        removePrinter();
      },
      (e: any) => {
        setIsLoading(false);
        console.warn(e);
      },
    );
  };

  const scanDevices = React.useCallback(() => {
    setIsLoading(true);
    BluetoothManager.scanDevices().then(
      (s: {found: any}) => {
        // const pairedDevices = s.paired;
        let found = s.found;
        try {
          found = JSON.parse(found); // @FIX_it: the parse action too weired..
        } catch (e) {
          // ignore
        }
        let fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setIsLoading(false);
      },
      (er: any) => {
        setIsLoading(false);
        // ignore
      },
    );
  }, [foundDs]);

  const scan = React.useCallback(() => {
    try {
      async function blueTooth(): Promise<void> {
        const permissions = {
          title: _('request_permission_bluettoh'),
          message: _('request_permission_bluettoh_message'),
          buttonNeutral: _('later'),
          buttonNegative: _('no'),
          buttonPositive: _('yes'),
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore access denied
        }
      }
      void blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const scanBluetoothDevice = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const request = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (
        request['android.permission.ACCESS_FINE_LOCATION'] === RESULTS.GRANTED
      ) {
        scanDevices();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const checkBluetoothEnabled = async (): Promise<void> => {
      const enabled = await BluetoothManager.isBluetoothEnabled();
      setBleOpend(enabled);
      setIsLoading(false);
    };
    void checkBluetoothEnabled();

    if (Platform.OS === 'ios') {
      const bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName('');
          setBoundAddress('');
        },
      );
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName('');
          setBoundAddress('');
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show(
            'Device Not Support Bluetooth !',
            ToastAndroid.LONG,
          );
        },
      );
    }
    if (pairedDevices.length < 1) {
      scan();
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  return {
    connect,
    unPair,
    scanBluetoothDevice,
    isLoading,
    bleOpend,
    name,
    pairedDevices,
    boundAddress,
  };
}
