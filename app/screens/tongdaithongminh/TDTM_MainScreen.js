/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';

import {requestGET} from '../../services/Api';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);
  const [DANHMUC, setDANHMUC] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await requestGET(`${dataService.TDTM_URL}/categories`);

    let data2 = [];

    if (user && user.token) {
      data2.push({
        id: 0,
        name: 'Yêu thích',
        navigate: 'TDTM_YeuThichScreen',
        data: {
          type: 'yeuthich',
        },
        icon: require('../../Images/favorite.png'),
        background: require('../../Images/paht1.jpg'),
      });
    }

    res.data &&
      res.data.map((item) => {
        data2.push({
          id: item.ID,
          name: item.Title,
          navigate: 'TDTM_DanhSachScreen',
          data: {
            name: item.Title,
            type: item.ID,
          },
          icon: item.Icon,
          iconClass: item.IconClass,
          background: item.Image && item.Image.length > 5 ? {uri: item.Image} : require('../../Images/tdtm0.jpg'),
        });
      });
    setDANHMUC(data2);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Tổng đài thông minh" isStack={true} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {DANHMUC.map((item) => (
            <ItemMenuImage item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
