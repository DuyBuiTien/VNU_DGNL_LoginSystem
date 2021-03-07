import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {SettingScreen, TrungTamTroGiupScreen} from '../screens/profile';
import AuthStack from './AuthStack';
import AppBottomTab from './AppBottomTab';

import {BDHC_UnitScreen, BDHC_UnitChildScreen} from '../screens/diaphuong';
import {GalleryScreen, WebViewScreen, VideoScreen} from '../screens/common';
import {MenuScreen} from '../screens/home';
import {
  DVC_MainScreen,
  DVC_TKHS_SearchScreen,
  DVC_TKHS_ScanCameraScreen,
  DVC_TKHS_DetailScreen,
  DVC_ThongKe_MainScreen,
} from '../screens/dvc';
import {PAHT_MainScreen, PAHT_ThongKeScreen, PAHT_TongHopScreen, PAHT_ThemMoiScreen, PAHT_DetailScreen} from '../screens/pakn';

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
      <Stack.Screen name="VideoScreen" component={VideoScreen} />

      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />

      <Stack.Screen name="DVC_MainScreen" component={DVC_MainScreen} />
      <Stack.Screen name="DVC_TKHS_SearchScreen" component={DVC_TKHS_SearchScreen} />
      <Stack.Screen name="DVC_TKHS_ScanCameraScreen" component={DVC_TKHS_ScanCameraScreen} />
      <Stack.Screen name="DVC_TKHS_DetailScreen" component={DVC_TKHS_DetailScreen} />
      <Stack.Screen name="DVC_ThongKe_MainScreen" component={DVC_ThongKe_MainScreen} />

      <Stack.Screen name="PAHT_MainScreen" component={PAHT_MainScreen} />
      <Stack.Screen name="PAHT_TongHopScreen" component={PAHT_TongHopScreen} />
      <Stack.Screen name="PAHT_ThemMoiScreen" component={PAHT_ThemMoiScreen} />
      <Stack.Screen name="PAHT_ThongKeScreen" component={PAHT_ThongKeScreen} />
      <Stack.Screen name="PAHT_DetailScreen" component={PAHT_DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
