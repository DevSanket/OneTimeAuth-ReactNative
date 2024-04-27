import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any, any>;
  mobile_no: string;
};

export default function FillDetailsPage({navigation, mobile_no}: Props) {
  return (
    <View>
      <Text>FillDetailsPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
