/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  Pressable,
} from 'react-native';

import {type BluetoothDevice} from 'tp-react-native-bluetooth-printer';

import {Box, Gap, HStack, Text, VStack} from '@components/atoms';
import {BaseLayout} from '@components/layouts';
import usePrinter from '@hooks/usePrinter';
import theme from '@theme/theme';

export default function ConnectPrinterTest(): JSX.Element {
  const {
    connect,
    unPair,
    scanBluetoothDevice,
    loading,
    bleOpend,
    pairedDevices,
    boundAddress,
  } = usePrinter();

  React.useEffect(() => {
    void scanBluetoothDevice();
  }, []);

  const renderItem: ListRenderItem<BluetoothDevice> = ({item, index}) => {
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
            if (item.address === boundAddress) {
              unPair(item.address);
              return;
            }
            connect(item);
          }}>
          <Box
            backgroundColor="buttonPrimaryBackground"
            p="xs"
            style={{borderRadius: 5}}>
            <Text color="textTertiaryColor" fontWeight="bold">
              {item.address === boundAddress ? 'Unpair' : 'Pair'}
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
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.textPrimaryColor} />
      ) : null}
      <FlatList
        data={pairedDevices}
        ItemSeparatorComponent={() => <Gap height={12} />}
        keyExtractor={item => item.address}
        renderItem={renderItem}
      />
    </BaseLayout>
  );
}
