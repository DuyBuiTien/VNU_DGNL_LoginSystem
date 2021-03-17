/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, FlatList, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {RectButton} from 'react-native-gesture-handler';

import {Header} from '../../components';
import {SearchComponent} from '../../components/common';
import {CB_Data} from '../../data/TMDT_Data';

const RenderItem = (props) => {
  const {data, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('KNCC_SanPham_ChiTietScreen', {data: data})}
      style={{
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e8e8e8',
      }}>
      <ImageBackground
        imageStyle={{borderRadius: 5}}
        resizeMode="cover"
        style={{width: 100, height: '100%'}}
        source={data.img ? {uri: data.img} : require('../../Images/nn1.jpg')}
      />
      <View style={{flex: 1, marginStart: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>{data.owner}</Text>
          <Text style={{color: '#757575', fontSize: 12, lineHeight: 30}}>{data.date}</Text>
        </View>
        <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
          {data.title}
        </Text>
        <Text style={{color: '#757575', fontSize: 12, paddingVertical: 5, flex: 1}} numberOfLines={2}>
          {data.content}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="map-marker-alt" color="#757575" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {data.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const KNCC_CB_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  const [data, setData] = useState(CB_Data);
  const [inputValue, setInputValue] = useState('');

  const [danhmuc, setDanhmuc] = useState({name: 'Toàn bộ'});
  const [khuvuc, setKhuvuc] = useState({name: 'Toàn quốc'});
  const [giaca, setGiaca] = useState({giatu: 0, giaden: 0});

  useEffect(() => {
    return () => {};
  }, []);

  const TimKiem = () => {};

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Danh sách sản phẩm" isStack={true} />
      <View style={{flex: 1}}>
        <SearchComponent value={inputValue} onChangeText={setInputValue} keyboardType={'web-search'} onSubmitEditing={TimKiem} />

        <View>
          <ScrollView horizontal style={{marginHorizontal: 10, flexDirection: 'row'}} showsHorizontalScrollIndicator={false}>
            <RectButton
              onPress={() => {}}
              style={[
                {
                  padding: 10,
                  margin: 5,
                  borderRadius: 4,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                {backgroundColor: '#F7F7F7'},
              ]}>
              <Text style={{color: 'gray', marginEnd: 10, fontWeight: 'normal'}} numberOfLines={1}>
                {khuvuc?.name ?? 'Khu vực'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'#F26946'} />
            </RectButton>
            <RectButton
              onPress={() => {}}
              style={[
                {
                  padding: 10,
                  margin: 5,
                  borderRadius: 4,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                {backgroundColor: '#F7F7F7'},
              ]}>
              <Text style={{color: 'gray', marginEnd: 10, fontWeight: 'normal'}} numberOfLines={1}>
                {danhmuc?.name ?? 'Danh mục'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'#F26946'} />
            </RectButton>
            <RectButton
              onPress={() => {}}
              style={[
                {
                  padding: 10,
                  margin: 5,
                  borderRadius: 4,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                {backgroundColor: '#F7F7F7'},
              ]}>
              <Text style={{color: 'gray', marginEnd: 10, fontWeight: 'normal'}} numberOfLines={1}>
                {'Giá'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'#F26946'} />
            </RectButton>
          </ScrollView>
        </View>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      </View>
    </View>
  );
};

export default KNCC_CB_MainScreen;

const styles = StyleSheet.create({});
