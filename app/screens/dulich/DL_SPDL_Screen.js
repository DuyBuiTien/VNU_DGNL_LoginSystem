/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

import {Button} from 'react-native-elements';

import {Header} from '../../components';
import {requestPOST} from '../../services/Api';

const RenderItem = (props) => {
  const navigation = useNavigation();

  const {data} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DL_DetailSP_Screen', {data: data})}
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
        source={{
          uri:
            data.AnhDaiDien && data.AnhDaiDien.length > 5
              ? data.AnhDaiDien
              : 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/14/ninh-thuan-thi-truong-day-hua-hen-cua-gioi-dau-tu-bds.jpg',
        }}
      />
      <View style={{flex: 1, marginStart: 10}}>
        <Text numberOfLines={2} style={{fontWeight: 'bold', color: '#455a64'}}>
          {data.Ten}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="map-marker-alt" color="#757575" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {`${data.Xa} ${data.Huyen}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);

  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [datafinal, setDatafinal] = useState([]);

  const fetchData = async () => {
    const res = await requestPOST(`${dataService.DL_URL}/LayDanhSachSanPham`, {
      skip: 0,
      top: 100,
    });

    setData(res.data ? res.data : []);
    setDatafinal(res.data ? res.data : []);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  //return await axios.get(`${dataService.PAHT_URL}/GetByStatus?limit=20&status=${status}`)

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Sản phẩm du lịch" isStack={true} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#EAEAEA',
            flexDirection: 'row',
            borderRadius: 8,
            padding: 4,
            margin: 10,
            alignItems: 'center',
            flex: 1,
          }}>
          <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
          <TextInput
            placeholder={'Tìm kiếm'}
            multiline={false}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            selectionColor={'gray'}
            clearButtonMode="always"
            style={{flex: 1}}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data.filter((item) => {
            const name = item.Ten.toUpperCase();
            return name.indexOf(inputValue.toUpperCase()) > -1;
          })}
          renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
