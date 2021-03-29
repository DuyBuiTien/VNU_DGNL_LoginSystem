/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, StatusBar, ImageBackground, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, Button, Icon} from 'react-native-elements';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import {QLDB_URL, HOST_YT} from '../../config/server';

const BDHC_UnitScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [dataAnh, setdataAnh] = useState([]);
  const [dataUrl, setdataUrl] = useState([]);

  const dataInfo = route.params?.data ?? null;

  useEffect(() => {
    var data1 = dataInfo.UrlAnhLienQuan ? dataInfo.UrlAnhLienQuan.split('\n') : [];

    var dataAnh_ = [];
    var dataUrl_ = [];
    data1.map((i) => {
      var url = i.split(',')[0];
      dataAnh_.push(url);
      dataUrl_.push({url: `${HOST_YT}${url}`});
    });
    setdataAnh(dataAnh_);
    setdataUrl(dataUrl_);
    return () => {};
  }, [dataInfo.UrlAnhLienQuan]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" style={{}} color="#2AA5FF" />
          <Text style={{textAlign: 'center', paddingTop: 10, color: '#2AA5FF'}}>Đang lấy dữ liệu</Text>
        </View>
      ) : (
        <>
          <View style={styles.linearGradient1}>
            <Icon onPress={() => navigation.goBack()} name="arrow-back" color="black" containerStyle={{paddingStart: 20}} />
            <Text style={styles.title}>Giới thiệu về {dataInfo.AreaName}</Text>
            <Icon name="home" color="transparent" containerStyle={{paddingEnd: 20}} />
          </View>
          <ScrollableTabView
            style={{flex: 1}}
            tabBarPosition="top"
            initialPage={0}
            tabBarActiveTextColor="#212121"
            tabBarInactiveTextColor="#9E9E9E"
            tabBarUnderlineStyle={{height: 1, backgroundColor: '#FF9800'}}
            renderTabBar={() => <DefaultTabBar style={{height: 30}} />}>
            <View tabLabel="Tổng quan" style={styles.tabView}>
              <ScrollView style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Giới thiệu</Text>
                <Text style={{lineHeight: 30, textAlign: 'justify'}}>{dataInfo.TongQuan_GioiThieu}</Text>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Hành chính</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Quốc gia</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_HanhChinh_QuocGia}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Vùng</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_HanhChinh_Vung}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Tỉnh lỵ</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_HanhChinh_TinhLy}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Trụ sở UBND</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_HanhChinh_TruSoUBND}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Phân chia hành chính</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_HanhChinh_PhanChiaHanhChinh}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Thành lậo</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_HanhChinh_ThanhLap}</Text>
                </View>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Dân số</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Tổng cộng</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_DanSo_Tong}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Thành thị</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_DanSo_ThanhThi}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Nông thôn</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_DanSo_NongThon}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Mật độ</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_DanSo_MatDo}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Dân số</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TongQuan_DanSo_DanToc}</Text>
                </View>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Ảnh</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('GalleryScreen', {images: dataUrl, title: dataInfo.AreaName})}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    backgroundColor: '#fff',
                    padding: 10,
                  }}>
                  {dataAnh.map((item) => (
                    <Image
                      resizeMethod="resize"
                      style={styles.renderImage}
                      source={{uri: `${HOST_YT}${item}`}}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  ))}
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View tabLabel="Tự nhiên" style={styles.tabView}>
              <ScrollView style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Địa hình</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Diện tích</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TuNhien_DiaHinh_DienTich}</Text>
                </View>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Khí hậu</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Đặc trưng</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TuNhien_KhiHau_DacTrung}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Mùa hè</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TuNhien_KhiHau_MuaHe}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Mùa đông</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TuNhien_KhiHau_MuaDong}</Text>
                </View>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Khoáng sản</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingLeft: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 0.5,
                  }}>
                  <Text style={{flex: 1 / 2}}>Khoáng sản</Text>
                  <Text style={{flex: 1 / 2}}>{dataInfo.TuNhien_KhoangSan}</Text>
                </View>
              </ScrollView>
            </View>
            <View tabLabel="Lịch sử" style={styles.tabView}>
              <ScrollView style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Lịch sử</Text>
                <Text style={{lineHeight: 30, textAlign: 'justify'}}>{dataInfo.LichSu}</Text>
              </ScrollView>
            </View>
            <View tabLabel="Kinh tế" style={styles.tabView}>
              <ScrollView style={{padding: 10}}>
                <Text style={{fontWeight: 'bold', padding: 10, paddingLeft: 0, fontSize: 16}}>Kinh tế</Text>
                <Text style={{lineHeight: 30}}>{dataInfo.KinhTe}</Text>
              </ScrollView>
            </View>
          </ScrollableTabView>
        </>
      )}
    </View>
  );
};

export default BDHC_UnitScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  view1: {
    backgroundColor: '#fff',
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
    shadowOpacity: 1.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 5,
    marginTop: -20,
    height: 40,
  },
  tabView: {
    flex: 1,
  },
  linearGradient1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
  renderImage: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
    aspectRatio: 1,
    margin: 10,
  },
});
