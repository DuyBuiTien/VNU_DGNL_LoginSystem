/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DANHMUC} from '../../data/YT_DatLichKham_TrucTuyen_Data';

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Đặt lịch khám trực tuyến" isStack={true} />
      <ScrollView>
        <Text style={{margin: 20, fontSize: 13, fontStyle: 'italic', color: '#424242'}}>
          Xin xem thêm trên trang chủ của nhà cung cấp dịch vụ để biết được điều kiện áp dụng cùng những thông tin cần thiết khác
        </Text>
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
