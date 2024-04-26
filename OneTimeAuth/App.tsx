import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {User} from './src/common/types';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';
import AppContext from './src/context/context';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigator/AuthNavigator';
import MainNavigator from './src/Navigator/MainNavigator';

export default function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <AlertNotificationRoot theme="light">
      <GestureHandlerRootView style={{flex: 1}}>
        <RootSiblingParent>
          <AppContext.Provider value={{userData, setUserData}}>
            <NavigationContainer>
              {!loading ? (
                !userData ? (
                  <AuthNavigator />
                ) : (
                  <MainNavigator />
                )
              ) : null}
            </NavigationContainer>
          </AppContext.Provider>
        </RootSiblingParent>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({});
