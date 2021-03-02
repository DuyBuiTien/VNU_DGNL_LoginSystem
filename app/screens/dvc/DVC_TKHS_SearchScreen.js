/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from '../../components';

const DVC_TKHS_SearchScreen = () => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');

  const TimKiemHoSo = () => {};

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Tra cứu hồ sơ" isStack={true} />
      <ScrollView style={{padding: 10}}>
        <Text style={{color: '#343F46', marginBottom: 10}}>
          Nhập mã hồ sơ hoặc số chứng minh thư vào ô bên dưới để bắt đầu tra cứu
        </Text>

        <Text style={{color: '#343F46', marginBottom: 10}}>Mã hồ sơ, chứng minh thư</Text>

        <TextInput
          placeholder={'Nhập mã hồ sơ/số chứng minh thư'}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          selectionColor={'gray'}
          clearButtonMode="always"
          style={{padding: 10, marginBottom: 10, borderColor: '#D1D1D1', borderWidth: 0.5, borderRadius: 8}}
        />

        <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
          <Text
            style={{
              color: '#343F46',
              marginBottom: 10,
              marginEnd: 10,
              marginTop: 5,
              alignContent: 'center',
            }}>
            Hoặc quét mã hồ sơ
          </Text>
          <FontAwesome name={'barcode-read'} size={20} onPress={() => {}} />
        </View>

        <TouchableOpacity style={{width: '100%', backgroundColor: '#F23A27', padding: 10, marginTop: 10, borderRadius: 10}} onPress={()=>TimKiemHoSo()}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#FFF'}}>Tìm kiếm hồ sơ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DVC_TKHS_SearchScreen;

const styles = StyleSheet.create({});
