import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {LoginScreen, ForgotScreen, RegisterScreen} from '../screens/auth';

import {SettingScreen, TrungTamTroGiupScreen} from '../screens/profile';
import AuthStack from './AuthStack';
import AppBottomTab from './AppBottomTab';

import {AccountScreen, ChangePasswordScreen} from '../screens/auth';
import {BDHC_UnitScreen, BDHC_UnitChildScreen, BDHC_UnitChild2Screen} from '../screens/diaphuong';
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
  DVC_Auth_ForgotScreen,
  DVC_Auth_LoginScreen,
  DVC_Auth_RegisterScreen,
  DVC_Auth_AccountScreen,
  DVC_Auth_ChangePasswordScreen,
  DVC_TKHS_CaNhan_DetailScreen,
  DVC_TKHS_DanhGiaScreen,
  DVC_TKHS_DanhGiaDVCScreen,
} from '../screens/dvc';
import {
  PAHT_MainScreen,
  PAHT_ThongKeScreen,
  PAHT_TongHopScreen,
  PAHT_ThemMoiScreen,
  PAHT_DetailScreen,
  PAHT_CaNhanScreen,
} from '../screens/pakn';

import {
  GT_MainScreen,
  GT_VEXEVEMB_MainScreen,
  GT_BanDoScreen,
  GT_DICHUNGXE_MainScreen,
  GT_PHATNGUOI_MainScreen,
  GT_STLGT_MainScreen,
  GT_OTGPLX_MainScreen,
  GT_ChiTietDiaDiemScreen,
  GT_DiChung_CaNhan_Screen,
  GT_DiChung_DangTin_Screen,
  GT_DiChung_DiChung_Screen,
  GT_DiChung_TimXeKhach_Screen,
  GT_DiChung_ChiTietScreen,
  GT_BienBao_MainScreen,
  GT_NONGDOCON_MainScreen,
  GT_DiChung_SuaTin_Screen,
  GT_DiChung_TimXeKhach_DanhSach_Screen,
} from '../screens/giaothong';

import {
  DL_MainScreen,
  DL_DDL_Screen,
  DL_CSLT_Screen,
  DL_DSD_Screen,
  DL_SPDL_Screen,
  DL_DetailSP_Screen,
  DL_Detail_CSLT_Screen,
  DL_DSD_ListScreen,
} from '../screens/dulich';

import {TDTM_MainScreen, TDTM_DanhSachScreen, TDTM_YeuThichScreen} from '../screens/tongdaithongminh';

import {
  GD_MainScreen,
  GD_DiemDanhScreen,
  GD_SLLDTScreen,
  GD_TKB_MainScreen,
  GD_DD_MainScreen,
  GD_TB_MainScreen,
  GD_KSK_MainScreen,
  GD_XNP_MainScreen,
  GD_XNP_ListScreen,
  GD_GY_MainScreen,
  GD_BT_MainScreen,
  GD_BT_DK_MainScreen,
  GD_BT_HDK_MainScreen,
  GD_BT_TK_MainScreen,
  GD_HTAScreen,
  GD_HTAListScreen,
  GD_HNScreen,
  GD_HNListScreen,
} from '../screens/giaoduc';

import {NN_MainScreen, NN_GCTTScreen} from '../screens/nongnghiep';

import {TMDT_DanhMucScreen, TMDT_CSKDScreen, TMDT_MainScreen} from '../screens/giacathitruong';

import {
  KNCC_MainScreen,
  KNCC_CM_MainScreen,
  KNCC_CB_MainScreen,
  KNCC_TDT_MainScreen,
  KNCC_DangTinScreen,
  KNCC_CaNhanScreen,
  KNCC_SanPham_ChiTietScreen,
  KNCC_SanPham_DanhSachScreen,
  KNCC_DanhMucScreen,
} from '../screens/ketnoicungcau';

import {TT_MainScreen} from '../screens/tintuc';

import {
  DNNDT_MainScreen,
  DNNDT_CSDLLScreen,
  DNNDT_CSDLLDetailScreen,
  DNNDT_TTTTLDScreen,
  DNNDT_TTTTLDDetailScreen,
  DNNDT_DAKGDTScreen,
  DNNDT_DAKGDT_LVScreen,
  DNNDT_DAKGDT_ListScreen,
  DNNDT_DAKGDT_DetailScreen,
  DNNDT_DDDNNDTScreen,
  DNNDT_DDDNNDTListScreen,
  DNNDT_DDDNNDTDetailScreen,
} from '../screens/doanhnghiep';

import {TTCQ_MainScreen, TTCQ_DetailScreen, TTCQ_DetailVBScreen} from '../screens/thongtinchinhquyen';

import {TTCB_MainScreen, TTCB_DetailScreen} from '../screens/thongtincanhbao';

import {DT_MainScreen, DT_TNScreen, DT_QTScreen, DT_DetailScreen, DT_COVIDScreen, DT_BTNScreen} from '../screens/diemtin';

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
  YT_TraCuuChiSoScreen,
} from '../screens/yte';

import {MT_MainScreen} from '../screens/moitruong';

import {BanDoScreen, ChiTietDiaDiemScreen} from '../screens/bando';

import {TD_MainScreen, TD_DetailScreen} from '../screens/tuyendung';

import {TTDB_MainScreen} from '../screens/thoitiet';

import {AL_MainScreen} from '../screens/amlich';
import {BookmarksScreen} from '../screens/bookmark';
import {DanhBaScreen} from '../screens/danhba';

import {TienIch_MainScreen} from '../screens/tienich';

import {NguoiYeuThe_MainScreen} from '../screens/nguoiyeuthe';

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
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="BookmarksScreen" component={BookmarksScreen} />
      <Stack.Screen name="DanhBaScreen" component={DanhBaScreen} />

      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="TrungTamTroGiupScreen" component={TrungTamTroGiupScreen} />
      <Stack.Screen name="BDHC_UnitScreen" component={BDHC_UnitScreen} />
      <Stack.Screen name="BDHC_UnitChildScreen" component={BDHC_UnitChildScreen} />
      <Stack.Screen name="BDHC_UnitChild2Screen" component={BDHC_UnitChild2Screen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="BanDoScreen" component={BanDoScreen} />
      <Stack.Screen name="ChiTietDiaDiemScreen" component={ChiTietDiaDiemScreen} />

      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="TT_MainScreen" component={TT_MainScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen name="AL_MainScreen" component={AL_MainScreen} />

      <Stack.Screen name="TTDB_MainScreen" component={TTDB_MainScreen} />

      <Stack.Screen name="DVC_MainScreen" component={DVC_MainScreen} />
      <Stack.Screen name="DVC_TKHS_SearchScreen" component={DVC_TKHS_SearchScreen} />
      <Stack.Screen name="DVC_TKHS_ScanCameraScreen" component={DVC_TKHS_ScanCameraScreen} />
      <Stack.Screen name="DVC_TKHS_DetailScreen" component={DVC_TKHS_DetailScreen} />
      <Stack.Screen name="DVC_ThongKe_MainScreen" component={DVC_ThongKe_MainScreen} />
      <Stack.Screen name="DVC_THUTUC_SearchScreen" component={DVC_THUTUC_SearchScreen} />
      <Stack.Screen name="DVC_THUTUC_DetailScreen" component={DVC_THUTUC_DetailScreen} />
      <Stack.Screen name="DVC_TKHS_CaNhanScreen" component={DVC_TKHS_CaNhanScreen} />
      <Stack.Screen name="DVC_Auth_ForgotScreen" component={DVC_Auth_ForgotScreen} />
      <Stack.Screen name="DVC_Auth_LoginScreen" component={DVC_Auth_LoginScreen} />
      <Stack.Screen name="DVC_Auth_RegisterScreen" component={DVC_Auth_RegisterScreen} />
      <Stack.Screen name="DVC_Auth_AccountScreen" component={DVC_Auth_AccountScreen} />
      <Stack.Screen name="DVC_Auth_ChangePasswordScreen" component={DVC_Auth_ChangePasswordScreen} />
      <Stack.Screen name="DVC_TKHS_CaNhan_DetailScreen" component={DVC_TKHS_CaNhan_DetailScreen} />
      <Stack.Screen name="DVC_TKHS_DanhGiaScreen" component={DVC_TKHS_DanhGiaScreen} />
      <Stack.Screen name="DVC_TKHS_DanhGiaDVCScreen" component={DVC_TKHS_DanhGiaDVCScreen} />

      <Stack.Screen name="DNNDT_MainScreen" component={DNNDT_MainScreen} />
      <Stack.Screen name="DNNDT_CSDLLScreen" component={DNNDT_CSDLLScreen} />
      <Stack.Screen name="DNNDT_CSDLLDetailScreen" component={DNNDT_CSDLLDetailScreen} />
      <Stack.Screen name="DNNDT_TTTTLDScreen" component={DNNDT_TTTTLDScreen} />
      <Stack.Screen name="DNNDT_TTTTLDDetailScreen" component={DNNDT_TTTTLDDetailScreen} />
      <Stack.Screen name="DNNDT_DAKGDTScreen" component={DNNDT_DAKGDTScreen} />
      <Stack.Screen name="DNNDT_DAKGDT_LVScreen" component={DNNDT_DAKGDT_LVScreen} />
      <Stack.Screen name="DNNDT_DAKGDT_ListScreen" component={DNNDT_DAKGDT_ListScreen} />
      <Stack.Screen name="DNNDT_DAKGDT_DetailScreen" component={DNNDT_DAKGDT_DetailScreen} />
      <Stack.Screen name="DNNDT_DDDNNDTScreen" component={DNNDT_DDDNNDTScreen} />
      <Stack.Screen name="DNNDT_DDDNNDTListScreen" component={DNNDT_DDDNNDTListScreen} />
      <Stack.Screen name="DNNDT_DDDNNDTDetailScreen" component={DNNDT_DDDNNDTDetailScreen} />

      <Stack.Screen name="PAHT_MainScreen" component={PAHT_MainScreen} />
      <Stack.Screen name="PAHT_TongHopScreen" component={PAHT_TongHopScreen} />
      <Stack.Screen name="PAHT_ThemMoiScreen" component={PAHT_ThemMoiScreen} />
      <Stack.Screen name="PAHT_ThongKeScreen" component={PAHT_ThongKeScreen} />
      <Stack.Screen name="PAHT_DetailScreen" component={PAHT_DetailScreen} />
      <Stack.Screen name="PAHT_CaNhanScreen" component={PAHT_CaNhanScreen} />

      <Stack.Screen name="DT_MainScreen" component={DT_MainScreen} />
      <Stack.Screen name="DT_TNScreen" component={DT_TNScreen} />
      <Stack.Screen name="DT_QTScreen" component={DT_QTScreen} />
      <Stack.Screen name="DT_DetailScreen" component={DT_DetailScreen} />
      <Stack.Screen name="DT_COVIDScreen" component={DT_COVIDScreen} />
      <Stack.Screen name="DT_BTNScreen" component={DT_BTNScreen} />

      <Stack.Screen name="GD_MainScreen" component={GD_MainScreen} />
      <Stack.Screen name="GD_DiemDanhScreen" component={GD_DiemDanhScreen} />
      <Stack.Screen name="GD_SLLDTScreen" component={GD_SLLDTScreen} />
      <Stack.Screen name="GD_TKB_MainScreen" component={GD_TKB_MainScreen} />
      <Stack.Screen name="GD_DD_MainScreen" component={GD_DD_MainScreen} />
      <Stack.Screen name="GD_TB_MainScreen" component={GD_TB_MainScreen} />
      <Stack.Screen name="GD_KSK_MainScreen" component={GD_KSK_MainScreen} />
      <Stack.Screen name="GD_XNP_MainScreen" component={GD_XNP_MainScreen} />
      <Stack.Screen name="GD_XNP_ListScreen" component={GD_XNP_ListScreen} />
      <Stack.Screen name="GD_GY_MainScreen" component={GD_GY_MainScreen} />
      <Stack.Screen name="GD_BT_MainScreen" component={GD_BT_MainScreen} />
      <Stack.Screen name="GD_BT_DK_MainScreen" component={GD_BT_DK_MainScreen} />
      <Stack.Screen name="GD_BT_HDK_MainScreen" component={GD_BT_HDK_MainScreen} />
      <Stack.Screen name="GD_BT_TK_MainScreen" component={GD_BT_TK_MainScreen} />
      <Stack.Screen name="GD_HTAScreen" component={GD_HTAScreen} />
      <Stack.Screen name="GD_HTAListScreen" component={GD_HTAListScreen} />
      <Stack.Screen name="GD_HNScreen" component={GD_HNScreen} />
      <Stack.Screen name="GD_HNListScreen" component={GD_HNListScreen} />

      <Stack.Screen name="TDTM_MainScreen" component={TDTM_MainScreen} />
      <Stack.Screen name="TDTM_DanhSachScreen" component={TDTM_DanhSachScreen} />
      <Stack.Screen name="TDTM_YeuThichScreen" component={TDTM_YeuThichScreen} />

      <Stack.Screen name="GT_MainScreen" component={GT_MainScreen} />
      <Stack.Screen name="GT_VEXEVEMB_MainScreen" component={GT_VEXEVEMB_MainScreen} />
      <Stack.Screen name="GT_BanDoScreen" component={GT_BanDoScreen} />
      <Stack.Screen name="GT_DICHUNGXE_MainScreen" component={GT_DICHUNGXE_MainScreen} />
      <Stack.Screen name="GT_PHATNGUOI_MainScreen" component={GT_PHATNGUOI_MainScreen} />
      <Stack.Screen name="GT_STLGT_MainScreen" component={GT_STLGT_MainScreen} />
      <Stack.Screen name="GT_OTGPLX_MainScreen" component={GT_OTGPLX_MainScreen} />
      <Stack.Screen name="GT_ChiTietDiaDiemScreen" component={GT_ChiTietDiaDiemScreen} />
      <Stack.Screen name="GT_DiChung_CaNhan_Screen" component={GT_DiChung_CaNhan_Screen} />
      <Stack.Screen name="GT_DiChung_DangTin_Screen" component={GT_DiChung_DangTin_Screen} />
      <Stack.Screen name="GT_DiChung_SuaTin_Screen" component={GT_DiChung_SuaTin_Screen} />
      <Stack.Screen name="GT_DiChung_DiChung_Screen" component={GT_DiChung_DiChung_Screen} />
      <Stack.Screen name="GT_DiChung_TimXeKhach_Screen" component={GT_DiChung_TimXeKhach_Screen} />
      <Stack.Screen name="GT_DiChung_ChiTietScreen" component={GT_DiChung_ChiTietScreen} />
      <Stack.Screen name="GT_BienBao_MainScreen" component={GT_BienBao_MainScreen} />
      <Stack.Screen name="GT_NONGDOCON_MainScreen" component={GT_NONGDOCON_MainScreen} />
      <Stack.Screen name="GT_DiChung_TimXeKhach_DanhSach_Screen" component={GT_DiChung_TimXeKhach_DanhSach_Screen} />

      <Stack.Screen name="DL_MainScreen" component={DL_MainScreen} />
      <Stack.Screen name="DL_DDL_Screen" component={DL_DDL_Screen} />
      <Stack.Screen name="DL_CSLT_Screen" component={DL_CSLT_Screen} />
      <Stack.Screen name="DL_DSD_Screen" component={DL_DSD_Screen} />
      <Stack.Screen name="DL_SPDL_Screen" component={DL_SPDL_Screen} />
      <Stack.Screen name="DL_DetailSP_Screen" component={DL_DetailSP_Screen} />
      <Stack.Screen name="DL_Detail_CSLT_Screen" component={DL_Detail_CSLT_Screen} />
      <Stack.Screen name="DL_DSD_ListScreen" component={DL_DSD_ListScreen} />

      <Stack.Screen name="YT_MainScreen" component={YT_MainScreen} />
      <Stack.Screen name="YT_TramYTeScreen" component={YT_TramYTeScreen} />
      <Stack.Screen name="YT_QuayThuocScreen" component={YT_QuayThuocScreen} />
      <Stack.Screen name="YT_DichBenhScreen" component={YT_DichBenhScreen} />
      <Stack.Screen name="YT_DanhBaScreen" component={YT_DanhBaScreen} />
      <Stack.Screen name="YT_BanDoScreen" component={YT_BanDoScreen} />
      <Stack.Screen name="YT_DatLichKhamScreen" component={YT_DatLichKhamScreen} />
      <Stack.Screen name="YT_DatLichKham_TrucTiepScreen" component={YT_DatLichKham_TrucTiepScreen} />
      <Stack.Screen name="YT_DatLichKham_TrucTuyenScreen" component={YT_DatLichKham_TrucTuyenScreen} />
      <Stack.Screen name="YT_TraCuuChiSoScreen" component={YT_TraCuuChiSoScreen} />

      <Stack.Screen name="NN_MainScreen" component={NN_MainScreen} />
      <Stack.Screen name="NN_GCTTScreen" component={NN_GCTTScreen} />

      <Stack.Screen name="TMDT_DanhMucScreen" component={TMDT_DanhMucScreen} />
      <Stack.Screen name="TMDT_MainScreen" component={TMDT_MainScreen} />
      <Stack.Screen name="TMDT_CSKDScreen" component={TMDT_CSKDScreen} />

      <Stack.Screen name="MT_MainScreen" component={MT_MainScreen} />

      <Stack.Screen name="TD_MainScreen" component={TD_MainScreen} />
      <Stack.Screen name="TD_DetailScreen" component={TD_DetailScreen} />

      <Stack.Screen name="KNCC_MainScreen" component={KNCC_MainScreen} />
      <Stack.Screen name="KNCC_CM_MainScreen" component={KNCC_CM_MainScreen} />
      <Stack.Screen name="KNCC_CB_MainScreen" component={KNCC_CB_MainScreen} />
      <Stack.Screen name="KNCC_TDT_MainScreen" component={KNCC_TDT_MainScreen} />
      <Stack.Screen name="KNCC_CaNhanScreen" component={KNCC_CaNhanScreen} />
      <Stack.Screen name="KNCC_DangTinScreen" component={KNCC_DangTinScreen} />
      <Stack.Screen name="KNCC_SanPham_ChiTietScreen" component={KNCC_SanPham_ChiTietScreen} />
      <Stack.Screen name="KNCC_SanPham_DanhSachScreen" component={KNCC_SanPham_DanhSachScreen} />
      <Stack.Screen name="KNCC_DanhMucScreen" component={KNCC_DanhMucScreen} />

      <Stack.Screen name="TTCQ_MainScreen" component={TTCQ_MainScreen} />
      <Stack.Screen name="TTCQ_DetailScreen" component={TTCQ_DetailScreen} />
      <Stack.Screen name="TTCQ_DetailVBScreen" component={TTCQ_DetailVBScreen} />
      <Stack.Screen name="TTCB_MainScreen" component={TTCB_MainScreen} />
      <Stack.Screen name="TTCB_DetailScreen" component={TTCB_DetailScreen} />

      <Stack.Screen name="TienIch_MainScreen" component={TienIch_MainScreen} />

      <Stack.Screen name="NguoiYeuThe_MainScreen" component={NguoiYeuThe_MainScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
