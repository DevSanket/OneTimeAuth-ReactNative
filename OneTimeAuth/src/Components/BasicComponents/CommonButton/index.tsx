import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../common/DefaultColors';
import AppText from '../AppText';

import {UIActivityIndicator} from 'react-native-indicators';

type ButtonProps = {
  OnClick: () => void;
  title: string;
  style?: Object;
  type?: string;
  disabled?: boolean;
  fontSize?: number;
};
export default function CommonButton({
  OnClick,
  title,
  style,
  disabled = false,
  fontSize,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, style]}
      onPress={OnClick}
      disabled={disabled}>
      <AppText style={[styles.LoginText, fontSize && {fontSize: fontSize}]}>
        {disabled ? <UIActivityIndicator size={26} color="white" /> : title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.Dark_Green_Blue,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 5,
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
  },
  LoginText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 8,
  },
});
