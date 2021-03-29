/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { RectButton } from 'react-native-gesture-handler';

import { Header } from '../../components';
import { SearchComponent } from '../../components/common';
import { ItemSanPhamHorizontal } from '../../components/ketnoicungcau';
import { CB_Data } from '../../data/TMDT_Data';
import { requestGET } from '../../services/Api';

const KNCC_CB_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [danhmuc, setDanhmuc] = useState({ name: 'Toàn bộ' });
  const [khuvuc, setKhuvuc] = useState({ name: 'Toàn quốc' });
  const [giaca, setGiaca] = useState({ giatu: 0, giaden: 0 });

  const fetchData = async () => {
    setIsLoading(true);
    var data3 = await requestGET(`${dataService.KNCC_URL}/SupplyDemand?q=`)
    var data4 = data3.data ? data3.data : []
    setData(data4)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  const TimKiem = () => { };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title="Danh sách sản phẩm" isStack={true} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
          <View style={{ flex: 1 }}>
            <SearchComponent value={inputValue} onChangeText={setInputValue} keyboardType={'web-search'} onSubmitEditing={TimKiem} />

            <View style={{}}>
              <ScrollView horizontal style={{ marginHorizontal: 10, flexDirection: 'row', }} showsHorizontalScrollIndicator={false}>
                <RectButton
                  onPress={() => { }}
                  style={[
                    {
                      padding: 10,
                      margin: 5,
                      borderRadius: 4,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                    { backgroundColor: '#F7F7F7' },
                  ]}>
                  <Text style={{ color: 'gray', marginEnd: 10, fontWeight: 'normal' }} numberOfLines={1}>
                    {khuvuc ? khuvuc.name : 'Khu vực'}
                  </Text>
                  <FontAwesome name={'chevron-down'} color={'#F26946'} />
                </RectButton>
                <RectButton
                  onPress={() => { }}
                  style={[
                    {
                      padding: 10,
                      margin: 5,
                      borderRadius: 4,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                    { backgroundColor: '#F7F7F7' },
                  ]}>
                  <Text style={{ color: 'gray', marginEnd: 10, fontWeight: 'normal' }} numberOfLines={1}>
                    {danhmuc ? danhmuc.name : 'Danh mục'}
                  </Text>
                  <FontAwesome name={'chevron-down'} color={'#F26946'} />
                </RectButton>
              </ScrollView>

            </View>
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item, index }) => <ItemSanPhamHorizontal data={item} index={index} navigation={navigation} />}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có kết quả</Text>}
            />
          </View>
        )}
    </View>
  );
};

export default KNCC_CB_MainScreen;

const styles = StyleSheet.create({});
