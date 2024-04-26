import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type SectionProp = PropsWithChildren<{
  style?: Object;
}>;

export default function AppText({children, style}: SectionProp) {
  return <Text style={[styles.textStyle, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Urbanist',
    fontSize: 14,
    color: '#000',
  },
});
