import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Children, PropsWithChildren} from 'react';

type ScreenProps = PropsWithChildren<{
  style?: Object;
  RefreshData?: () => void;
}>;

export default function Screen({children, style, RefreshData}: ScreenProps) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (RefreshData) {
      RefreshData();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={[styles.ScreenStyle, style]}
      style={{height: '100%'}}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScreenStyle: {
    padding: 15,
    backgroundColor: '#fff',
  },
});
