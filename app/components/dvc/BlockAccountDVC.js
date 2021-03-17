/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import * as actions from '../../redux/dvc/Actions';

//
const BlockLogin = (props) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.dvc.user);
  const dispatch = useDispatch();

  return (
    <View style={{backgroundColor: '#F4E7D5', marginHorizontal: 20, borderRadius: 10, padding: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <FontAwesome name={'info-circle'} color="#F23A27" size={20} />
        <Text style={{marginHorizontal: 10, color: '#72746F'}}>
          Xin chào <Text style={{fontWeight: 'bold'}}>{user.fullName}</Text>
        </Text>
      </View>

      <RectButton
        style={{width: '100%', backgroundColor: '#F23A27', padding: 8, marginTop: 10, borderRadius: 10}}
        onPress={() => {
          navigation.navigate('DVC_Auth_AccountScreen');
        }}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#FFF'}}>Thông tin cá nhân</Text>
      </RectButton>
      <RectButton
        style={{width: '100%', backgroundColor: '#FFF', padding: 8, marginTop: 10, borderRadius: 10}}
        onPress={() => {
          dispatch(actions.logOut());
        }}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#F23A27'}}>Đăng xuất</Text>
      </RectButton>
    </View>
  );
};

export default BlockLogin;

const styles = StyleSheet.create({});
