import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {t as _} from 'i18next';

export default function SplashScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>{_('point_of_sale')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  appTitle: {color: 'black', fontSize: 32, fontWeight: '600'},
});
