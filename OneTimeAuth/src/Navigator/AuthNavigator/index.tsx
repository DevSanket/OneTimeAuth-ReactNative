import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../../Pages/Register';
import Login from '../../Pages/Login';
import ForgotPassword from '../../Pages/ForgotPassword';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
