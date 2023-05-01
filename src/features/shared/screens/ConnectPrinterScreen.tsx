/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  Pressable,
  RefreshControl,
} from 'react-native';

import {t as _} from 'i18next';
import {type BluetoothDevice} from 'tp-react-native-bluetooth-printer';

import {Box, Gap, HStack, Text, VStack} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import {useGetPrinter} from '@features/shared/store/printer';
import usePrinter from '@hooks/usePrinter';
import theme from '@theme/theme';

export default function ConnectPrinterScreen(): JSX.Element {
  const {
    connect,
    unPair,
    scanBluetoothDevice,
    isLoading,
    bleOpend,
    pairedDevices,
  } = usePrinter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      void scanBluetoothDevice();
      setRefreshing(false);
    }, 2000);
  }, []);

  const printerDevice = useGetPrinter();

  const onPressConnect = React.useCallback(
    (device: BluetoothDevice) => {
      const isPaired = device.address === printerDevice.address;

      if (isPaired) {
        unPair(device.address);
        return;
      }
      void connect(device);
    },
    [unPair, connect, printerDevice.address],
  );

  React.useEffect(() => {
    void scanBluetoothDevice();
  }, []);

  const renderItem: ListRenderItem<BluetoothDevice> = ({item, index}) => {
    const isPaired = item.address === printerDevice.address;
    return (
      <HStack
        justifyContent="space-between"
        alignItems="center"
        p="s"
        backgroundColor="cardSecondaryBackground"
        style={{borderRadius: 15}}>
        <VStack>
          <Text>{item.name}</Text>
          <Text>{item.address}</Text>
        </VStack>

        <Pressable
          onPress={() => {
            onPressConnect(item);
          }}>
          <Box
            backgroundColor="buttonPrimaryBackground"
            p="xs"
            style={{borderRadius: 5}}>
            <Text color="textTertiaryColor" fontWeight="bold">
              {isPaired ? _('unpair') : _('pair')}
            </Text>
          </Box>
        </Pressable>
      </HStack>
    );
  };

  return (
    <BaseLayout>
      <Text
        color="textPrimaryColor"
        textAlign="center"
        fontSize={16}
        fontWeight="bold">
        {bleOpend ? 'Bluetooth Active' : 'Bluetooth Inactive'}
      </Text>
      <Gap height={12} />
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.textPrimaryColor} />
      ) : null}
      <FlatList
        data={pairedDevices}
        ItemSeparatorComponent={() => <Gap height={12} />}
        keyExtractor={item => item.address}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        refreshing={isLoading}
      />
    </BaseLayout>
  );
}
