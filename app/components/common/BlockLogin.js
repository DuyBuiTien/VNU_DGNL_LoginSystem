/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const BlockLogin = (props) => {
  return (
    <View style={{backgroundColor: '#F4E7D5', marginHorizontal: 20, borderRadius: 10, padding: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <FontAwesome name={'info-circle'} color="#F23A27" size={20} />
        <Text style={{marginHorizontal: 10, fontWeight: '400', fontSize: 16}}>Đăng nhập</Text>
      </View>
      <Text style={{color: '#72746F'}}>
        Bạn cần đăng nhập để sử dụng các tiện ích của chức năng <Text style={{fontWeight: 'bold'}}>{props.name}</Text>
      </Text>

      <TouchableOpacity style={{width: '100%', backgroundColor: '#F23A27', padding: 8, marginTop: 10, borderRadius: 10}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#FFF'}}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width: '100%', backgroundColor: '#FFF', padding: 8, marginTop: 10, borderRadius: 10}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#F23A27'}}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlockLogin;

const styles = StyleSheet.create({});
