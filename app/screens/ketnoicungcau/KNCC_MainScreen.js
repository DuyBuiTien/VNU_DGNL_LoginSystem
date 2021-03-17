/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from '../../components';
import {ItemSanPhamVertical, ItemHomeMenu, ItemDanhMuc} from '../../components/ketnoicungcau';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {CB_Data, DANHMUC, MENU} from '../../data/TMDT_Data';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  const [dataMenu, setDataMenu] = useState(MENU);
  const [dataDanhMuc, setDataDanhMuc] = useState(DANHMUC);

  return (
    <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
      <Header title="Kết nối cung cầu" isStack={true} />
      <ScrollView>
        <View style={{backgroundColor: '#FFF', paddingVertical: 10}}>
          <FlatList
            data={dataMenu}
            renderItem={({item, index}) => <ItemHomeMenu item={item} index={index} navigation={navigation} />}
            keyExtractor={(item, index) => index.toString()}
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
            data={dataDanhMuc}
            renderItem={({item, index}) => <ItemDanhMuc item={item} index={index} navigation={navigation} />}
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
            renderItem={({item, index}) => <ItemSanPhamVertical data={item} index={index} navigation={navigation} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
