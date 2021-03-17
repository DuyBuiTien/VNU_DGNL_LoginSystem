/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
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
import {TouchableOpacity} from 'react-native-gesture-handler';

import {TT_URL} from '../../config/server';
import {requestPOST, requestGET} from '../../services/Api';

import {ThoiTietHome} from '../../components/lichaqi';
import {CovidItem} from '../../components/covid';
import {HeaderList} from '../../components/common';

import images from '../../themes/Images';
const _w = Dimensions.get('screen').width < 500 ? 50 : 70;
const _h = Dimensions.get('screen').width < 500 ? 50 : 70;
const _b = Dimensions.get('screen').width < 500 ? 25 : 30;

const {height, width} = Dimensions.get('window');

import moment from 'moment';
moment.locale('vi');

const _renderItem6 = (props) => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TTCQ_DetailScreen', {data: item});
      }}
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
        source={{
          uri: item.thumbnail ? item.thumbnail : 'https://file1.dangcongsan.vn/DATA/0/2018/07/thaibinh20-17_53_38_549.jpg',
        }}
      />
      <View style={{height: 80, padding: 10}}>
        <Text style={{fontSize: 14}} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row', paddingTop: 10}}>
          <FontAwesome name="clock" size={16} color="#9E9E9E" />
          <Text style={{color: '#9E9E9E', fontSize: 12, paddingLeft: 10}}>{moment(item.created_at).format('L')}</Text>
        </View>
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

  const dataMenuCaNhan = useSelector((state) => state.global.dataMenuCaNhan);
  const dataMenu = useSelector((state) => state.global.dataMenu);
  const dataService = useSelector((state) => state.global.dataService);

  let datamenus = [];

  const [dataNB, setDataNB] = useState([]);

  if (dataMenuCaNhan && dataMenuCaNhan.length > 0) {
    dataMenuCaNhan.map((i) => {
      dataMenu.map((j) => {
        j.appid === i && datamenus.push(j);
      });
    });
    //datamenus = dataMenuCaNhan;
  } else {
    dataMenu.map((i) => {
      if (i.menumain) {
        datamenus.push(i);
      }
    });
  }

  datamenus.push({
    appid: 100,
    name: 'Xem thêm',
    navigate: 'MenuScreen',
    icon: 'ellipsis-h',
    color: '#DFE6EE',
  });

  useEffect(() => {
    const fetchData = async () => {
      var data1 = await requestGET(`${dataService.TT_URL}/GetDuLieuTinBai?page=2&limit=20&sync_time=0`);
      var data2 = data1.data ? data1.data : [];
      setDataNB(data2.slice(0, 6));
    };
    fetchData();
    return () => {};
  }, []);

  const _renderItem7 = ({item, index}) => {
    return (
      <TouchableOpacity
        key={item.appid}
        onPress={() => navigation.navigate(item.navigate)}
        style={{justifyContent: 'center', alignItems: 'center', width: width / 4 - 2, marginVertical: 5}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: _h,
            width: _w,
            backgroundColor: item.color,
            borderRadius: 20,
          }}>
          <FontAwesome name={item.icon} color="#fff" size={_b} containerStyle={styles.icon} />
        </View>
        <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, height: 50}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} />

      <ImageBackground source={images.background.tet2} style={{flex: 1 / 6}}>
        <View style={{paddingTop: 40, padding: 10, flexDirection: 'row'}}>
          <Text style={styles.title1}> Xin chào, </Text>
          <Text style={styles.title2}>{fullName}</Text>
        </View>
      </ImageBackground>
      <View style={{marginTop: -50, backgroundColor: 'transparent', flex: 1}}>
        <View style={{flex: 1}}>
          <ThoiTietHome />
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{flexGrow: 1}}>
            <FlatList
              data={datamenus}
              renderItem={({item, index}) => <_renderItem7 item={item} index={index} navigation={navigation} />}
              keyExtractor={(item, index) => index.toString()}
              //contentContainerStyle={{padding: 10}}
              contentContainerStyle={{
                marginTop: 10,
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              numColumns={4}
            />

            <HeaderList
              title="Thống kê COVID"
              onPress={() =>
                navigation.navigate('WebViewScreen', {
                  data: {
                    title: 'Tình hình dịch Covid',
                    url: 'https://ncov.moh.gov.vn',
                    colorHeader: '#252C68',
                    hideBackForward: false,
                    textColor: 'white',
                  },
                })
              }
            />

            <CovidItem />

            <View style={{padding: 10, paddingRight: 0}}>
              <View style={styles.viewHeader}>
                <Text style={styles.textHeaderTitle}> Tin tức</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('TTCQ_MainScreen');
                  }}>
                  <Text style={styles.textHeaderAll}>Tất cả</Text>
                  <Icon name="chevron-right" type="font-awesome" size={16} color="#f44336" />
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
  textHeaderAll: {color: '#90caf9', fontStyle: 'italic', marginHorizontal: 10},
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
