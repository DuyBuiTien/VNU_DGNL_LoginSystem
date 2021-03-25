/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import { Header } from '../../components';
import { ItemSanPhamVertical, ItemHomeMenu, ItemDanhMuc } from '../../components/ketnoicungcau';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { CB_Data, DANHMUC, MENU } from '../../data/TMDT_Data';
import { requestGET } from '../../services/Api';

import {Divider} from 'react-native-elements'

const KNCC_DanhMucScreen = (props) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const route = useRoute();

  const { id, title } = route.params

  const [data, setData] = useState([]);
  const [dataDanhMuc, setDataDanhMuc] = useState([]);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    var data1 = await requestGET(`${dataService.KNCC_URL}/subcategory?CategoryId=${id}`)
    var data2 = data1 ? data1 : []
    var data3 = await requestGET(`${dataService.KNCC_URL}/SupplyDemand?CategoryId=${id}`)
    var data4 = data3.data ? data3.data : []
    setData(data4)
    setDataDanhMuc(data2)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={title} isStack={true} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
          <ScrollView>
            <View style={{ backgroundColor: '#FFF'}}>
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{
                  alignSelf: 'flex-start',
                }}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={dataDanhMuc}
                renderItem={({ item, index }) => <ItemDanhMuc item={item} index={index} navigation={navigation} />}
                ListEmptyComponent={() => <Text style={{ textAlign: 'center', color: '#50565B', margin: 10 }}>Không có kết quả</Text>}
              />
            </View>
            <Divider style={{height: 8, backgroundColor: '#eeeeee'}} />
            <View style={{ backgroundColor: '#FFF'}}>
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{
                  alignSelf: 'flex-start',
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => <ItemSanPhamVertical data={item} index={index} navigation={navigation} />}
                ListEmptyComponent={() => <Text style={{ textAlign: 'center', color: '#50565B', margin: 10 }}>Không có kết quả</Text>}
              />
            </View>
          </ScrollView>
        )}
    </View>
  );
};

export default KNCC_DanhMucScreen;

const styles = StyleSheet.create({});
