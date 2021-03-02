import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {SettingScreen, TrungTamTroGiupScreen} from '../screens/profile';
import AuthStack from './AuthStack';
import AppBottomTab from './AppBottomTab';

import {BDHC_UnitScreen, BDHC_UnitChildScreen} from '../screens/diaphuong';
import {GalleryScreen, WebViewScreen} from '../screens/common';
import {MenuScreen} from '../screens/home';
import {DVC_MainScreen, DVC_TKHS_SearchScreen} from '../screens/dvc';

const AppStack = () => {
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {});

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
        }
        // setLoading(false);
      });
  }, []);

  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'HomeScreen'}>
      <Stack.Screen name="TrangChuScreen" component={AppBottomTab} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="TrungTamTroGiupScreen" component={TrungTamTroGiupScreen} />
      <Stack.Screen name="BDHC_UnitScreen" component={BDHC_UnitScreen} />
      <Stack.Screen name="BDHC_UnitChildScreen" component={BDHC_UnitChildScreen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />

      <Stack.Screen name="DVC_MainScreen" component={DVC_MainScreen} />
      <Stack.Screen name="DVC_TKHS_SearchScreen" component={DVC_TKHS_SearchScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
