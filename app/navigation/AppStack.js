import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {LoginScreen, ForgotScreen, RegisterScreen} from '../screens/auth';

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
  DVC_THUTUC_SearchScreen,
  DVC_THUTUC_DetailScreen,
  DVC_TKHS_CaNhanScreen,
} from '../screens/dvc';
import {
  PAHT_MainScreen,
  PAHT_ThongKeScreen,
  PAHT_TongHopScreen,
  PAHT_ThemMoiScreen,
  PAHT_DetailScreen,
  PAHT_CaNhanScreen,
} from '../screens/pakn';

import {GT_MainScreen, GT_VEXEVEMB_MainScreen} from '../screens/giaothong';

import {DL_MainScreen} from '../screens/dulich';

import {TDTM_MainScreen, TDTM_DanhSachScreen} from '../screens/tongdaithongminh';

import {GD_MainScreen, GD_DiemDanhScreen, GD_SLLDTScreen} from '../screens/giaoduc';

import {NN_MainScreen} from '../screens/nongnghiep';

import {TMDT_DanhMucScreen, TMDT_CSKDScreen, TMDT_MainScreen} from '../screens/giacathitruong';

import {KNCC_MainScreen, KNCC_CM_MainScreen, KNCC_CB_MainScreen, KNCC_TDT_MainScreen} from '../screens/ketnoicungcau';

import {TT_MainScreen} from '../screens/tintuc';

import {TTCQ_MainScreen, TTCQ_DetailScreen, TTCQ_DetailVBScreen} from '../screens/thongtinchinhquyen';

import {
  YT_MainScreen,
  YT_TramYTeScreen,
  YT_QuayThuocScreen,
  YT_DichBenhScreen,
  YT_DanhBaScreen,
  YT_BanDoScreen,
  YT_DatLichKhamScreen,
  YT_DatLichKham_TrucTiepScreen,
  YT_DatLichKham_TrucTuyenScreen,
} from '../screens/yte';

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

      <Stack.Screen name="TT_MainScreen" component={TT_MainScreen} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen name="DVC_MainScreen" component={DVC_MainScreen} />
      <Stack.Screen name="DVC_TKHS_SearchScreen" component={DVC_TKHS_SearchScreen} />
      <Stack.Screen name="DVC_TKHS_ScanCameraScreen" component={DVC_TKHS_ScanCameraScreen} />
      <Stack.Screen name="DVC_TKHS_DetailScreen" component={DVC_TKHS_DetailScreen} />
      <Stack.Screen name="DVC_ThongKe_MainScreen" component={DVC_ThongKe_MainScreen} />
      <Stack.Screen name="DVC_THUTUC_SearchScreen" component={DVC_THUTUC_SearchScreen} />
      <Stack.Screen name="DVC_THUTUC_DetailScreen" component={DVC_THUTUC_DetailScreen} />
      <Stack.Screen name="DVC_TKHS_CaNhanScreen" component={DVC_TKHS_CaNhanScreen} />

      <Stack.Screen name="PAHT_MainScreen" component={PAHT_MainScreen} />
      <Stack.Screen name="PAHT_TongHopScreen" component={PAHT_TongHopScreen} />
      <Stack.Screen name="PAHT_ThemMoiScreen" component={PAHT_ThemMoiScreen} />
      <Stack.Screen name="PAHT_ThongKeScreen" component={PAHT_ThongKeScreen} />
      <Stack.Screen name="PAHT_DetailScreen" component={PAHT_DetailScreen} />
      <Stack.Screen name="PAHT_CaNhanScreen" component={PAHT_CaNhanScreen} />

      <Stack.Screen name="GD_MainScreen" component={GD_MainScreen} />
      <Stack.Screen name="GD_DiemDanhScreen" component={GD_DiemDanhScreen} />
      <Stack.Screen name="GD_SLLDTScreen" component={GD_SLLDTScreen} />

      <Stack.Screen name="TDTM_MainScreen" component={TDTM_MainScreen} />
      <Stack.Screen name="TDTM_DanhSachScreen" component={TDTM_DanhSachScreen} />

      <Stack.Screen name="GT_MainScreen" component={GT_MainScreen} />
      <Stack.Screen name="GT_VEXEVEMB_MainScreen" component={GT_VEXEVEMB_MainScreen} />

      <Stack.Screen name="DL_MainScreen" component={DL_MainScreen} />

      <Stack.Screen name="YT_MainScreen" component={YT_MainScreen} />
      <Stack.Screen name="YT_TramYTeScreen" component={YT_TramYTeScreen} />
      <Stack.Screen name="YT_QuayThuocScreen" component={YT_QuayThuocScreen} />
      <Stack.Screen name="YT_DichBenhScreen" component={YT_DichBenhScreen} />
      <Stack.Screen name="YT_DanhBaScreen" component={YT_DanhBaScreen} />
      <Stack.Screen name="YT_BanDoScreen" component={YT_BanDoScreen} />
      <Stack.Screen name="YT_DatLichKhamScreen" component={YT_DatLichKhamScreen} />
      <Stack.Screen name="YT_DatLichKham_TrucTiepScreen" component={YT_DatLichKham_TrucTiepScreen} />
      <Stack.Screen name="YT_DatLichKham_TrucTuyenScreen" component={YT_DatLichKham_TrucTuyenScreen} />

      <Stack.Screen name="NN_MainScreen" component={NN_MainScreen} />

      <Stack.Screen name="TMDT_DanhMucScreen" component={TMDT_DanhMucScreen} />
      <Stack.Screen name="TMDT_MainScreen" component={TMDT_MainScreen} />
      <Stack.Screen name="TMDT_CSKDScreen" component={TMDT_CSKDScreen} />

      <Stack.Screen name="KNCC_MainScreen" component={KNCC_MainScreen} />
      <Stack.Screen name="KNCC_CM_MainScreen" component={KNCC_CM_MainScreen} />
      <Stack.Screen name="KNCC_CB_MainScreen" component={KNCC_CB_MainScreen} />
      <Stack.Screen name="KNCC_TDT_MainScreen" component={KNCC_TDT_MainScreen} />

      <Stack.Screen name="TTCQ_MainScreen" component={TTCQ_MainScreen} />
      <Stack.Screen name="TTCQ_DetailScreen" component={TTCQ_DetailScreen} />
      <Stack.Screen name="TTCQ_DetailVBScreen" component={TTCQ_DetailVBScreen} />

    </Stack.Navigator>
  );
};

export default AppStack;
