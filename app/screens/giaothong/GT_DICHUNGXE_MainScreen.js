/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, ImageBackground, Image, RefreshControl} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
const {width} = Dimensions.get('window');
import axios from 'axios';

import {Header} from '../../components';
import {ItemSanPhamVertical, ItemHomeMenu, ItemDanhMuc} from '../../components/ketnoicungcau';
import {RenderItemDiChung} from '../../components/giaothong';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {MENU} from '../../data/GT_Data';

const NhaXes = [
  {
    id: 1,
    name: 'Phúc Lộc Thọ Limousine',
    image: 'https://static.vexere.com/c/i/17782/xe-phuc-loc-tho-limousine-VeXeRe-vUi0ceI-1000x600.jpeg',
    address: 'Hà Nội',
  },
  {
    id: 2,
    name: 'Phúc Lộc Thọ Limousine',
    image: 'https://static.vexere.com/c/i/17782/xe-phuc-loc-tho-limousine-VeXeRe-vUi0ceI-1000x600.jpeg',
    address: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Phúc Lộc Thọ Limousine',
    image: 'https://static.vexere.com/c/i/17782/xe-phuc-loc-tho-limousine-VeXeRe-vUi0ceI-1000x600.jpeg',
    address: 'Hà Nội',
  },
  {
    id: 4,
    name: 'Phúc Lộc Thọ Limousine',
    image: 'https://static.vexere.com/c/i/17782/xe-phuc-loc-tho-limousine-VeXeRe-vUi0ceI-1000x600.jpeg',
    address: 'Hà Nội',
  },
  {
    id: 5,
    name: 'Phúc Lộc Thọ Limousine',
    image: 'https://static.vexere.com/c/i/17782/xe-phuc-loc-tho-limousine-VeXeRe-vUi0ceI-1000x600.jpeg',
    address: 'Hà Nội',
  },
];

const RenderItemNhaXe = (props) => {
  const {data, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        flexDirection: 'row',
        margin: 5,
        alignItems: 'flex-start',
        borderWidth: 0.5,
        borderColor: '#e8e8e8',
        borderRadius: 4,
      }}>
      <ImageBackground
        imageStyle={{}}
        resizeMode="cover"
        style={{width: 100, height: 100}}
        source={data.image ? {uri: data.image} : require('../../Images/nn1.jpg')}
      />
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>{data.owner}</Text>
          <Text style={{color: '#757575', fontSize: 12, lineHeight: 30}}>{data.date}</Text>
        </View>
        <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
          {data.name}
        </Text>
        {/* <Text style={{color: '#757575', fontSize: 12, paddingVertical: 5, flex: 1}} numberOfLines={2}>
          {data.content}
        </Text> */}
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}}>
          <FontAwesome name="map-marker-alt" color="#757575" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {data.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const [dataMenu, setDataMenu] = useState(MENU);

  const [dataNhaXe, setDataNhaXe] = useState([]);
  const [dataDiChung, setDataDiChung] = useState([]);

  useEffect(() => {
    setDataNhaXe(NhaXes);
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios({
        method: 'get',
        url: `${dataService.BOOKMARK_URL}/v1/dichungxe/tinmoi`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.data && response.data.data) {
        setDataDiChung(response.data.data);
      } else {
      }
      setRefreshing(false);
    };
    fetchData();
    return () => {};
  }, [refreshing]);

  return (
    <View style={{flex: 1, backgroundColor: '#eeeeee'}}>
      <Header title="Đi chung" isStack={true} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
          <Text style={{margin: 10, fontWeight: 'bold', fontSize: 15}}>Tin mới</Text>
          {dataDiChung.map((item, index) => (
            <RenderItemDiChung data={item} index={index} navigation={navigation} />
          ))}
        </View>

        <View style={{backgroundColor: '#FFF', marginTop: 10}}>
          <Text style={{margin: 10, fontWeight: 'bold', fontSize: 15}}>Nhà xe phổ biến</Text>
          <FlatList
            horizontal={true}
            scrollEnabled={true}
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={dataNhaXe}
            renderItem={({item, index}) => <RenderItemNhaXe data={item} index={index} navigation={navigation} />}
          />
        </View>
        <Image
          resizeMode="cover"
          source={require('../../Images/dichung.jpg')}
          style={{borderRadius: 5, height: 300, width: '100%'}}
        />
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
