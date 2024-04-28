import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonButton from '../../Components/BasicComponents/CommonButton';
import useData from '../../context/useData';

export default function Home() {
  const {logOut} = useData();
  return (
    <View>
      <Text>Home</Text>
      <CommonButton title="Log out" OnClick={() => logOut()} />
    </View>
  );
}

const styles = StyleSheet.create({});
