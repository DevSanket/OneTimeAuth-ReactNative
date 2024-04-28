import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import appStorage from './src/context/storage';
import {getUserProfile} from './src/ApiCalls/Authentication';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const {width} = Dimensions.get('window');

  const RestoreDetails = async () => {
    const data = await appStorage.getData();

    if (data) {
      let new_data = await JSON.parse(data);

      if (!new_data.user) {
        await appStorage.removeData();
      } else {
        const newUser = await getUserProfile(new_data.user.accessToken);
        if (newUser) {
          setUserData(newUser);
        } else {
          setUserData(null);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    RestoreDetails();
  }, []);

  useEffect(() => {
    SplashScreen.hide(); // Hide splash screen once loading is complete
  }, [loading]);

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
