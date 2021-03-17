/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';

import {GD_INFO} from '../../data/GD_Data'

import { requestGET, requestPOST } from '../../services/Api';

const RenderItem = (props) => {
  const {item, navigation} = props;
  return (
  <TouchableOpacity
      onPress={() => {}}
      style={{
      flexDirection: 'row',
      padding: 10,
      margin: 5,
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#e8e8e8',
      }}>
      <View style={{height: 60, width: 60, borderRadius: 80, borderWidth: 2, borderColor: '#2AA5FF', alignItems: 'center', justifyContent: 'center'}}>
            <FontAwesome name='user' size={24} color='#2AA5FF' />
        </View>
      <View style={{flex: 1, marginStart: 10}}>
          <Text numberOfLines={2} style={{fontWeight: 'bold'}}>{item.HocSinh}</Text>
          <View style={{flexDirection: 'row', paddingTop: 20}}><Text style={{color: '#757575'}}>Trạng thái điểm danh: </Text><Text style={{color: '#4CAF50'}}>{item.TrangThai}</Text></View>
      </View>
  </TouchableOpacity>
  );
};

const GD_DiemDanhScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        var body = {'token': GD_INFO.token, 'sodienthoai': GD_INFO.phoneNumber}
        var data1 = await requestPOST(`${dataService.GD_URL}/ThongBaoDiemDanh`, body)
        var data2 = data1.data?data1.data:[]
        setData(data2)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Header title="Điểm danh" isStack={true} />
              <FlatList 
              data={data}
              renderItem={RenderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{margin: 10}}
              extraData={data}
              refreshControl={
                <RefreshControl
                  tintColor='#2AA5FF'
                  refreshing={isLoading}
                  onRefresh={async() => {
                    setIsLoading(true);
                    var body = {'token': GD_INFO.token, 'sodienthoai': GD_INFO.phoneNumber}
                    var data1 = await requestPOST(`${dataService.GD_URL}/ThongBaoDiemDanh`, body)
                    var data2 = data1.data?data1.data:[]
                    setData(data2)
                    setIsLoading(false);
                  }}
                  progressViewOffset={20}
                />
                }
                />
        </View>
    );
};

export default GD_DiemDanhScreen;

const styles = StyleSheet.create({});
