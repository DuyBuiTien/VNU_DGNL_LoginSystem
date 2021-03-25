/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {ItemMenu, Header} from '../../components';

const SettingScreen = () => {
  const navigation = useNavigation();
  const checkXacThucVanTay = true;

  return (
    <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
      <Header title="Cài đặt" isStack={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => navigation.navigate('SettingScreen')}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.view}>
              <FontAwesome name="cogs" size={24} color="#5C7F63" style={{marginHorizontal: 15}} />
              <View style={{flex: 1}}>
                <Text style={[styles.text_title, {flex: 1}]}>Xác thực sinh trắc học</Text>
                <Text style={[styles.text_title, {color: '#818181', marginTop: 5, fontSize: 13}]}>
                  Vân tay, khuôn mặt, mống mắt
                </Text>
              </View>
            </View>
          </View>
          <Switch
            style={styles.icon_right}
            onValueChange={() => {
              //XuLyVanTay(!checkXacThucVanTay);
            }}
            value={checkXacThucVanTay}
          />
        </TouchableOpacity>

        <ItemMenu
          onPress={() => navigation.navigate('ChangePasswordScreen')}
          title={'Đổi mật khẩu'}
          iconLeft="key"
          colorIconLeft="#5C7F63"
        />
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  text: {
    // fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  item: {
    paddingVertical: 15,
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text_title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#353535',
  },
  icon_right: {marginEnd: 10, color: '#818181'},
  view: {flexDirection: 'row', flex: 1, alignItems: 'center'},
});
