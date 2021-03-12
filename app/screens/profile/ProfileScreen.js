/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VersionCheck from 'react-native-version-check';

import {ItemMenu, Header} from '../../components';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const avatarUrl = 'https://gravatar.com/avatar/b40f03bff7ca801821bb5e335fa6be2d?s=400&d=robohash&r=x';

  return (
    <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
      <Header title="Tài khoản" leftComponent={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={[styles.item]} activeOpacity={0.6} onPress={() => navigation.navigate('AccountScreen')}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              containerStyle={{marginHorizontal: 15, backgroundColor: 'transparent'}}
              size="medium"
              rounded
              source={{
                uri: avatarUrl,
              }}
            />
            <View style={styles.view}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#353535',
                  }}>
                  {'Tung Lam'}
                </Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 13,
                    marginTop: 5,
                    color: '#52575D',
                  }}>
                  0988171725
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#c0ca33',
                  padding: 3,
                  marginEnd: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '300',
                    color: '#FFF',
                    marginHorizontal: 5,
                  }}>
                  Đã xác thực
                </Text>
              </View>
            </View>
          </View>
          <Icon name="chevron-right" size={16} style={styles.icon_right} />
        </TouchableOpacity>

        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Danh bạ'}
          iconLeft="address-book"
          colorIconLeft="#3F3795"
        />
        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Đánh dấu'}
          iconLeft="bookmark"
          colorIconLeft="#00B843"
        />

        <ItemMenu
          onPress={() => navigation.navigate('TrungTamTroGiupScreen')}
          title={'Trung tâm trợ giúp'}
          iconLeft="life-ring"
          colorIconLeft="#00B843"
        />

        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Giới thiệu bạn bè'}
          iconLeft="share-alt"
          colorIconLeft="#00B843"
        />

        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Cài đặt'}
          titleRight={'Mật khẩu & bảo mật'}
          iconLeft="cogs"
          colorIconLeft="#00B843"
        />

        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Đăng xuất'}
          iconLeft="sign-out-alt"
          colorIconLeft="#d50000"
        />

        <Text style={{textAlign: 'center', margin: 10, color: '#818181'}}>
          Phiên bản: {`${VersionCheck.getCurrentVersion()} (${VersionCheck.getCurrentBuildNumber()})`}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

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
