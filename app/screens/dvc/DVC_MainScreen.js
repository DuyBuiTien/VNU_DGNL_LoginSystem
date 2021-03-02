/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {Header} from '../../components';
import {ItemMenuImage} from '../../components/common';
import {DVC_DANHMUC} from '../../data/DVC_Data';

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Dịch vụ công" isStack={true} />
      <ScrollView>
        {!user && (
          <View style={{backgroundColor: '#F4E7D5', marginHorizontal: 20, borderRadius: 10, padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
              <FontAwesome name={'info-circle'} color="#F23A27" size={20} />
              <Text style={{marginHorizontal: 10, fontWeight: '400', fontSize: 16}}>Đăng nhập</Text>
            </View>
            <Text style={{color: '#72746F'}}>Bạn cần đăng nhập để sử dụng các tiện ích của chức năng Dịch vụ công</Text>

            <TouchableOpacity style={{width: '100%', backgroundColor: '#F23A27', padding: 8, marginTop: 10, borderRadius: 10}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#FFF'}}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '100%', backgroundColor: '#FFF', padding: 8, marginTop: 10, borderRadius: 10}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#F23A27'}}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {DVC_DANHMUC.map((item) => (
            <ItemMenuImage item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});
