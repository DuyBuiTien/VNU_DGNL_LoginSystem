/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';

import {QLDB_URL, HOST_YT} from '../../config/server';
import {areaCode} from '../../config/province';
import {requestGET} from '../../services/Api';

const DiaPhuongScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataChild, setdataChild] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('vaoday');
      var data1 = await requestGET(`${QLDB_URL}/DiaBanApi/mGetAreaInfo?AreaCode=${areaCode}`);

      var dataInfo_ = data1.data ? data1.data[0] : [];

      console.log(dataInfo_);

      var data2 = await requestGET(`${QLDB_URL}/DiaBanApi/mGetChildByCode?AreaCode=${areaCode}`);
      var dataChild_ = data2.data ? data2.data : [];

      setDataInfo(dataInfo_);
      setdataChild(dataChild_);
      setLoading(false);
    };
    fetchData();
    return () => {
      setDataInfo([]);
      setdataChild([]);
    };
  }, []);

  const RenderAnh1 = (data) => {
    if (dataInfo) {
      var urlAnh1 = data
        ? `${HOST_YT}${data.UrlAnhDaiDien.split(',')[0]}`
        : 'https://vneconomy.mediacdn.vn/zoom/480_270/2019/3/29/tp-hcm-155384260439116565666-crop-1553842610657853611450.jpg';
      return <ImageBackground source={{uri: urlAnh1}} style={{height: 250}} />;
    }
  };

  const RenderAnh2 = (item) => {
    if (dataInfo) {
      var urlAnh = item
        ? `${HOST_YT}${item.UrlAnhDaiDien.split(',')[0]}`
        : 'https://vneconomy.mediacdn.vn/zoom/480_270/2019/3/29/tp-hcm-155384260439116565666-crop-1553842610657853611450.jpg';
      return (
        <ImageBackground
          source={{uri: urlAnh}}
          style={{height: 80, width: 100, overflow: 'hidden', borderTopLeftRadius: 10, borderBottomRightRadius: 20}}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" style={{}} color="#2AA5FF" />
          <Text style={{textAlign: 'center', paddingTop: 10, color: '#2AA5FF'}}>Đang lấy dữ liệu</Text>
        </View>
      ) : (
        <>
          {dataChild && dataInfo ? (
            <ScrollView>
              {RenderAnh1(dataInfo)}
              <View style={styles.view1}>
                <Icon type="font-awesome" name="map" size={18} color="#FF9800" />
                <Text style={{fontWeight: 'bold'}}> Bản đồ hành chính {dataInfo.AreaName}</Text>
              </View>
              <View style={{padding: 15}}>
                <Text style={{color: '#FF9800'}}>Dư địa chí</Text>
                <Text style={{fontSize: 40, padding: 5, paddingLeft: 0}}>{dataInfo.AreaName}</Text>
                <Text numberOfLines={3} style={{lineHeight: 30}}>
                  {dataInfo.TongQuan_GioiThieu}
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('BDHC_UnitScreen', {data: dataInfo})}
                  style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
                  <Text style={{color: '#FF9800', fontWeight: '600'}}>Xem chi tiết </Text>
                  <Icon type="font-awesome" name="chevron-right" size={18} color="#FF9800" />
                </TouchableOpacity>
                <Text style={{fontSize: 18, paddingTop: 30, paddingBottom: 10, fontWeight: '600'}}>Các đơn vị hành chính</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                  }}>
                  {dataChild.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.ID}
                        onPress={() => props.navigation.navigate('BDHC_UnitChildScreen', {data: item})}
                        style={{justifyContent: 'center', padding: 5}}>
                        {RenderAnh2(item)}
                        <Text style={{paddingTop: 10, fontWeight: '600', width: 100, height: 50}}>{item.AreaName}</Text>
                        <Text style={{paddingTop: 5, color: '#757575', paddingBottom: 10}} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Không có dữ liệu</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default DiaPhuongScreen;

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
    elevation: 8,
  },
});
