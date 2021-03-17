/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from '../../components';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {CB_Data} from '../../data/TMDT_Data';

const _w = Dimensions.get('screen').width < 500 ? 50 : 70;
const _h = Dimensions.get('screen').width < 500 ? 50 : 70;
const _b = Dimensions.get('screen').width < 500 ? 25 : 30;

const {height, width} = Dimensions.get('window');

const RenderItemSanPham = (props) => {
  const {data, navigation} = props;

  return (
    <TouchableOpacity key={data.appid} onPress={() => {}} style={{width: width / 2 - 20, margin: 10}}>
      <ImageBackground
        imageStyle={{borderRadius: 5}}
        resizeMode="cover"
        style={{width: '100%', height: 100}}
        source={data.img ? {uri: data.img} : require('../../Images/nn1.jpg')}
      />
      <Text style={{paddingTop: 10, fontSize: 13}} numberOfLines={2}>
        {data.title}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
        <FontAwesome name="calendar-alt" size={13} color="#9e9e9e" />
        <Text style={{marginStart: 5, fontSize: 12, color: '#9e9e9e'}} numberOfLines={1}>
          {data.date}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
        <FontAwesome name="map-marker-alt" size={13} color="#9e9e9e" />
        <Text style={{marginStart: 5, fontSize: 12, color: '#9e9e9e', flex: 1}} numberOfLines={1}>
          {data.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const RenderItemMenu = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      key={item.appid}
      onPress={() => navigation.navigate(item.navigate)}
      style={{justifyContent: 'center', alignItems: 'center', width: width / 4 - 2}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: _h,
          width: _w,
          backgroundColor: item.color,
          borderRadius: 1000,
        }}>
        <FontAwesome name={item.icon} color="#fff" size={_b} containerStyle={styles.icon} />
      </View>
      <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, fontSize: 13}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const RenderItemDanhMuc = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      key={item.appid}
      onPress={() => navigation.navigate(item.navigate)}
      style={{justifyContent: 'center', alignItems: 'center', width: width / 4 - 2, marginVertical: 10}}>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: _h,
          width: _w,
          backgroundColor: item.color,
          borderRadius: 8,
        }}>
        <FontAwesome name={item.icon} color="#fff" size={_b} containerStyle={styles.icon} />
      </View> */}
      <ImageBackground
        resizeMethod="resize"
        imageStyle={{borderRadius: 8}}
        style={{height: 60, width: 60, resizeMode: 'cover', aspectRatio: 1}}
        source={{uri: item.image}}
      />
      <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, fontSize: 13}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  const DATA = [
    {
      appid: 1,
      name: 'Cần mua',
      navigate: 'KNCC_CM_MainScreen',
      icon: 'money-bill',
      color: '#c0ca33',
    },
    {
      appid: 2,
      name: 'Cần bán',
      navigate: 'KNCC_CB_MainScreen',
      icon: 'store',
      color: '#e64a19',
    },
    {
      appid: 3,
      name: 'Đăng tin',
      navigate: 'KNCC_DangTinScreen',
      icon: 'bullhorn',
      color: '#5B63EC',
    },
    {
      appid: 4,
      name: 'Tin của tôi',
      navigate: 'KNCC_CaNhanScreen',
      icon: 'user-alt',
      color: '#bdbdbd',
    },
  ];

  const DATADANHMUC = [
    {
      appid: 1,
      name: 'Bất động sản',
      navigate: 'PAHT_MainScreen',
      image: 'https://cafefcdn.com/thumb_w/650/2020/7/7/bdsehxs-1594112473427911622668-crop-15941125050461441714049.jpg',
    },
    {
      appid: 2,
      name: 'Xe cộ',
      navigate: 'PAHT_MainScreen',
      image:
        'http://admin.saovietlaw.com/DiaNam-DNS/Upload/images/5-ly-do-vi-sao-khong-nen-mua-xe-hoi-bang-gia-xe-o-to-moi-nhat-hom-nay-thang-1568002119-width800height450.jpg',
    },
    {
      appid: 3,
      name: 'Việc làm',
      navigate: 'PAHT_MainScreen',
      image:
        'https://media.npr.org/assets/img/2020/03/13/gettyimages-667018224_wide-e69134a24ff79fd3a338ff83661815c6299e58bd-s800-c85.jpg',
    },
    {
      appid: 4,
      name: 'Đồ điện tử',
      navigate: 'PAHT_MainScreen',
      image: 'https://anhduongtours.vn/wp-content/uploads/2017/12/mua-do-dien-tu-tai-dai-loan-1.jpg',
    },
    {
      appid: 5,
      name: 'Thực phẩm',
      navigate: 'PAHT_MainScreen',
      image: 'http://hanoimoi.com.vn/Uploads/images/phananh/2020/02/27/thucpham.jpg',
    },
    {
      appid: 6,
      name: 'Mẹ và bé',
      navigate: 'PAHT_MainScreen',
      image: 'https://www.sapo.vn/blog/wp-content/uploads/2014/12/tao-suc-hap-dan-cho-shop-me-be1.jpg',
    },
    {
      appid: 7,
      name: 'Du lịch, dịch vụ',
      navigate: 'PAHT_MainScreen',
      image: 'https://vnn-imgs-f.vgcloud.vn/2020/05/21/23/du-lich.jpg',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
      <Header title="Kết nối cung cầu" isStack={true} />
      <ScrollView>
        <View style={{backgroundColor: '#FFF', paddingVertical: 10}}>
          <FlatList
            data={DATA}
            renderItem={({item, index}) => <RenderItemMenu item={item} index={index} navigation={navigation} />}
            keyExtractor={(item, index) => index.toString()}
            //contentContainerStyle={{padding: 10}}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            numColumns={4}
          />
        </View>
        <View style={{backgroundColor: '#FFF', marginTop: 10}}>
          <Text style={{margin: 10, fontWeight: '600'}}>Khám phá danh mục</Text>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={DATADANHMUC}
            renderItem={({item, index}) => <RenderItemDanhMuc item={item} index={index} navigation={navigation} />}
          />
        </View>
        <View style={{backgroundColor: '#FFF', marginTop: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{margin: 10, fontWeight: '600', flex: 1}}>Tin dành cho bạn</Text>
            <TouchableOpacity
              style={{flexDirection: 'row', marginHorizontal: 5}}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('KNCC_SanPham_DanhSachScreen');
              }}>
              <Text style={{color: '#90caf9', fontStyle: 'italic', marginHorizontal: 10}}>Tất cả</Text>
              <FontAwesome name="chevron-right" size={16} color="#f44336" />
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={CB_Data}
            renderItem={({item, index}) => <RenderItemSanPham data={item} index={index} navigation={navigation} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
