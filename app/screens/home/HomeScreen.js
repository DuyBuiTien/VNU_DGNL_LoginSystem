/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, Button, Icon, Divider, Badge} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';
var moment = require('moment');
moment.locale('vi');

import {getLunarDate, getDayName} from '../../utils/amlich';

import {TT_URL} from '../../config/server';
import {requestPOST} from '../../services/Api';

import images from '../../themes/Images';
const _w = Dimensions.get('screen').width < 500 ? 60 : 70;
const _h = Dimensions.get('screen').width < 500 ? 60 : 70;
const _b = Dimensions.get('screen').width < 500 ? 25 : 30;

const RenderAQI = (aqi) => {
  if (aqi > 200) {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: '#b283c5', borderRadius: 10}}>
        <View style={{padding: 10, backgroundColor: '#a97abc', borderRadius: 10}}>
          <Image resizeMode="cover" style={{width: 40, height: 40}} source={images.background.facepurple} />
        </View>
        <View style={{padding: 10}}>
          <Text style={{color: '#634675', fontSize: 14, fontWeight: 'bold', padding: 5}}>{aqi}</Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>AQI</Text>
        </View>
      </View>
    );
  } else if (aqi > 99 && aqi < 201) {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: '#ff7978', borderRadius: 10}}>
        <View style={{padding: 10, backgroundColor: '#fe6a69', borderRadius: 10}}>
          <Image resizeMode="cover" style={{width: 40, height: 40}} source={images.background.facered} />
        </View>
        <View style={{padding: 10}}>
          <Text style={{color: '#af2c3b', fontSize: 14, fontWeight: 'bold', padding: 5}}>{aqi}</Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>AQI</Text>
        </View>
      </View>
    );
  } else if (aqi > 0 && aqi < 100) {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: '#ffdf58', borderRadius: 10}}>
        <View style={{padding: 10, backgroundColor: '#fdd74b', borderRadius: 10}}>
          <Image resizeMode="cover" style={{width: 40, height: 40}} source={images.background.faceyellow} />
        </View>
        <View style={{padding: 10}}>
          <Text style={{color: '#a57f23', fontSize: 14, fontWeight: 'bold', padding: 5}}>{aqi}</Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>AQI</Text>
        </View>
      </View>
    );
  }
};

const _renderItem6 = (props) => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WebViewScreen', {title: 'Tin tức', url: item.Link, color: '#f44336'})}
      style={{
        flex: 1,
        flexDirection: 'column',
        width: 300,
        marginEnd: 10,
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#f44336',
      }}>
      <ImageBackground
        resizeMode="cover"
        style={{
          height: 100,
        }}
        imageStyle={{borderRadius: 5}}
        source={{uri: item.Image}}
      />
      <View style={{height: 80, padding: 10}}>
        <Text style={{fontSize: 14}} numberOfLines={3}>
          {item.Title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const user = useSelector((state) => state.global.user);
  const fullName = user?.fullName ?? 'Khách';

  const [dataNB, setDataNB] = useState([]);
  const dataMenuMainFavor = [
    {
      appid: '1',
      menumain: 1,
      name: 'Dịch vụ hành chính công',
      navigate: 'DVC_MainScreen',
      count: 0,
      icon: 'university',
      color: '#0E2D7D',
      datamenu: [],
    },
    {
      appid: '5',
      menumain: 1,
      name: 'Tổng đài thông minh',
      navigate: 'TĐTM_MainScreen',
      count: 0,
      icon: 'phone-volume',
      color: '#DD0E2C',
      datamenu: [],
    },
    {
      appid: '8',
      name: 'Giáo dục',
      navigate: 'GD_MainScreen1',
      count: 0,
      icon: 'graduation-cap',
      color: '#0271FE',
      datamenu: [],
    },
    {
      appid: '9',
      name: 'Y tế',
      navigate: 'YT_MainScreen',
      count: 0,
      icon: 'hospital-alt',
      color: '#AF1A16',
      datamenu: [],
    },
    {
      appid: '2',
      menumain: 1,
      name: 'Phản ánh hiện trường',
      navigate: 'PAHT_MainScreen',
      count: 0,
      icon: 'mail-bulk',
      color: '#5B63EC',
      datamenu: [],
    },
    {
      appid: '3',
      menumain: 1,
      name: 'Du lịch',
      navigate: 'DL_MainScreen',
      count: 0,
      icon: 'umbrella-beach',
      color: '#FC7D2E',
      datamenu: [],
    },
    {
      appid: '4',
      menumain: 1,
      name: 'Thông tin cảnh báo',
      navigate: 'TTCB_MainScreen',
      count: 0,
      icon: 'exclamation-triangle',
      color: '#FFC815',
      datamenu: [],
    },
    {
      appid: '6',
      menumain: 1,
      name: 'Điện nước',
      navigate: 'DN_MainScreen',
      count: 0,
      icon: 'clipboard-list',
      color: '#29AAE1',
      datamenu: [],
    },
    {
      appid: '10',
      name: 'Nông nghiệp',
      navigate: 'NN_MainScreen',
      count: 0,
      icon: 'tractor',
      color: '#45A659',
      datamenu: [],
    },
    {
      appid: '12',
      name: 'Giá cả thị trường',
      navigate: 'GCTT_MainScreen',
      count: 0,
      icon: 'chart-line',
      color: '#2856C6',
      datamenu: [],
    },
    {
      appid: '13',
      name: 'Môi trường',
      navigate: 'MT_MainScreen',
      count: 0,
      icon: 'cannabis',
      color: '#0271FE',
      datamenu: [],
    },
    {
      appid: '14',
      name: 'An toàn thực phẩm',
      navigate: 'ATTP_MainScreen',
      count: 0,
      icon: 'user-shield',
      color: '#FC7D2E',
      datamenu: [],
    },
    {
      appid: '15',
      name: 'Giao thông',
      navigate: 'GT_MainScreen',
      count: 0,
      icon: 'traffic-light',
      color: '#0271FE',
      datamenu: [],
    },
    {
      appid: '16',
      name: 'Người yếu thế',
      navigate: 'NYT_MainScreen',
      count: 0,
      icon: 'praying-hands',
      color: '#0E2D7D',
      datamenu: [],
    },
    {
      appid: '17',
      name: 'Tiện ích',
      navigate: 'TI_MainScreen',
      count: 0,
      icon: 'tools',
      color: '#45A659',
      datamenu: [],
    },
    {
      appid: '18',
      name: 'Điểm tin',
      navigate: 'DT_MainScreen',
      count: 0,
      icon: 'newspaper',
      color: '#DD0E2C',
      datamenu: [],
    },
    {
      appid: 100,
      name: 'Xem thêm',
      navigate: 'MenuScreen',
      icon: 'ellipsis-h',
      color: '#DFE6EE',
    },
  ];

  const ld = getLunarDate(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear());
  const al = getDayName(ld);

  var ngayAm = `${al}`;

  useEffect(() => {
    const fetchData = async () => {
      var body = {
        take: 10,
        urlRoot: 'https://bacha.laocai.gov.vn/',
        urlSpecific: 'Default.aspx?sname=huyenbacha&sid=1262&pageid=28621',
        parentXpath: "//ul[contains(@class, 'ArticleList')]//li",
        titleXpath: './/a',
        descriptionXpath: './/a',
        imageXpath: './/img',
      };
      var data1 = await requestPOST(TT_URL, body);
      var data2 = data1.data ? data1.data : [];
      console.log(data2);
      setDataNB(data2);
    };
    fetchData();
    return () => {};
  }, []);

  const _renderItem7 = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.appid}
        onPress={() => navigation.navigate(item.navigate)}
        style={{justifyContent: 'center', alignItems: 'center', padding: 5, width: '25%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: _h,
            width: _w,
            backgroundColor: item.color,
            borderRadius: _b,
          }}>
          <FontAwesome name={item.icon} color="#fff" size={_b} containerStyle={styles.icon} />
        </View>
        <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, height: 50}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={images.background.tet2} style={{flex: 1 / 6}}>
        <View style={{paddingTop: 40, padding: 10, flexDirection: 'row'}}>
          <Text style={styles.title1}> Xin chào, </Text>
          <Text style={styles.title2}>{fullName}</Text>
        </View>
      </ImageBackground>
      <View style={{marginTop: -50, backgroundColor: 'transparent', flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              margin: 10,
              marginBottom: 5,
              borderRadius: 10,
              backgroundColor: '#fff',
              padding: 10,
              shadowColor: 'rgba(171, 180, 189, 0.35)',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 1,
              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', padding: 5}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('WebViewScreen', {})}
                style={{flex: 1 / 2, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FontAwesome name="calendar-alt" size={16} color="#f44336" />
                  <Text style={{fontWeight: '600', color: '#9E9E9E'}}> {moment().format('dddd').toUpperCase()}</Text>
                </View>
                <Text style={{fontWeight: '600', padding: 5}}>{moment().format('L')}</Text>
                <Text style={{fontWeight: '600', fontSize: 12}}>{ngayAm}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('WebViewScreen', {})}
                style={{flex: 1 / 2, alignItems: 'center', justifyContent: 'center'}}>
                {RenderAQI(50)}
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{flexGrow: 1}}>
            <FlatList
              data={dataMenuMainFavor}
              renderItem={({item, index}) => <_renderItem7 item={item} index={index} navigation={navigation} />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{padding: 10}}
              numColumns={4}
              extraData={dataMenuMainFavor}
            />
            <View style={{padding: 10, paddingRight: 0}}>
              <View style={styles.viewHeader}>
                <Text style={styles.textHeaderTitle}> Tin tức</Text>
                <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={0.8} onPress={() => {}}>
                  <Text style={styles.textHeaderAll}> </Text>
                  <Icon name="chevron-down" type="font-awesome" size={16} color="#f44336" />
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                scrollEnabled
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                data={dataNB}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <_renderItem6 item={item} index={index} navigation={navigation} />}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title1: {
    color: '#fff',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  title2: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  viewHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 5,
    paddingStart: 5,
    paddingEnd: 15,
    marginVertical: 10,
    marginStart: 10,
    flexDirection: 'row',
    borderLeftWidth: 2,
    borderLeftColor: '#f44336',
  },
  textHeaderTitle: {fontSize: 18, color: '#3D4458', fontWeight: '500'},
  textHeaderAll: {color: '#90caf9', fontStyle: 'italic'},
  viewIcon: {
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: '#FBEDEB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textCount: {fontWeight: 'bold', fontSize: 17, color: '#3D4458'},
  textTitle: {color: '#B2B4C6'},
});
