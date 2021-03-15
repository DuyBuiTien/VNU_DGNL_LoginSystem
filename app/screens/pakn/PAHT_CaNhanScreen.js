/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Button} from 'react-native-elements';

import {BlockLogin} from '../../components/common';

import {Header} from '../../components';
import {requestGET} from '../../services/Api';

const RenderItem = (props) => {
  const {data, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PAHT_DetailScreen', {data: data, public: 1})}
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
            data.anhdaidien && data.anhdaidien.length > 5
              ? data.anhdaidien
              : 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/14/ninh-thuan-thi-truong-day-hua-hen-cua-gioi-dau-tu-bds.jpg',
        }}
      />
      <View style={{flex: 1, marginStart: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>{data.tinhtrang}</Text>
          <Text style={{color: '#757575', fontSize: 12, lineHeight: 30}}>{data.thoigiangui}</Text>
        </View>
        <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
          {data.tieude}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="map-marker-alt" color="#757575" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {data.diachi}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);

  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [dataDangXL, setDataDangXL] = useState([]);
  const [dataDaXL, setDataDaX] = useState([]);
  const [dataCaNhan, setDataCaNhan] = useState([]);
  const [dataNhieuNhat, setDataNhieuNhat] = useState([]);

  const fetchData = async (status, func) => {
    const res = await requestGET(`${dataService.PAHT_URL}/GetByStatus?limit=50&status=${status}`);
    var data2 = res.length > 0 ? JSON.parse(res) : null;

    func(data2.data ? data2.data : []);
  };

  useEffect(() => {
    fetchData('new', setData);
    fetchData('notanswered', setDataDangXL);
    fetchData('answered', setDataDaX);
    fetchData('mostview', setDataNhieuNhat);

    return () => {};
  }, []);

  //return await axios.get(`${dataService.PAHT_URL}/GetByStatus?limit=20&status=${status}`)

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Tổng hợp ý kiến" isStack={true} />
      {!user ? (
        <BlockLogin name={'Phản ánh hiện trường'} />
      ) : (
        <>
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
            <FontAwesome name="filter" color="#787C7E" size={20} style={{marginHorizontal: 10}} />
          </View>
          <View style={{flex: 1}}>
            <ScrollableTabView
              style={{}}
              renderTabBar={() => <ScrollableTabBar />}
              initialPage={0}
              tabBarPosition="top"
              tabBarActiveTextColor="#757575"
              tabBarInactiveTextColor={'#BDBDBD'}
              tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                tabLabel="Đã xử lý"
                data={dataDaXL}
                renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                )}
              />
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                tabLabel="Đang xử lý"
                data={dataDangXL}
                renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                )}
              />

              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                tabLabel="Đánh dấu"
                data={dataNhieuNhat}
                renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                )}
              />
            </ScrollableTabView>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTopWidth: 0.5,
              borderTopColor: '#BDBDBD',
              backgroundColor: '#fff',
            }}>
            <Button
              title="Gửi phản ánh"
              titleStyle={{fontSize: 16, color: '#fff', fontWeight: '600'}}
              containerStyle={{margin: 10, marginHorizontal: 50, marginBottom: 30}}
              buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
              onPress={() => {
                navigation.navigate('PAHT_ThemMoiScreen');
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
