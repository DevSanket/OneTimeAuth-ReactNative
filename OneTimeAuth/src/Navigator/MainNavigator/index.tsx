import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../../Pages/Home';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
