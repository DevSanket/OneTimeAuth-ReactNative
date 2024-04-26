import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {User} from './common/types';

export default function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
