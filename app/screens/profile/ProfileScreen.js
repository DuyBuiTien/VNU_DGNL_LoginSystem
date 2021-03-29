/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, Share} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VersionCheck from 'react-native-version-check';
import {useSelector, useDispatch} from 'react-redux';

import {ItemMenu, Header} from '../../components';
import * as actions from '../../redux/global/Actions';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dispatch = useDispatch();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Tải App Smart Tân Dân tại https://www.tandan.com.vn/portal/home/default.aspx',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
      <Header title="Tài khoản" leftComponent={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {user && (
          <TouchableOpacity style={[styles.item]} activeOpacity={0.6} onPress={() => navigation.navigate('AccountScreen')}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Avatar
                containerStyle={{marginHorizontal: 15, backgroundColor: 'transparent'}}
                size="medium"
                rounded
                source={{
                  uri: user.avatar,
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
                    {user.fullName}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      fontSize: 13,
                      marginTop: 5,
                      color: '#52575D',
                    }}>
                    {user.phoneNumber}
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
        )}

        {/* {user && (
          <ItemMenu
            onPress={() => navigation.navigate('DanhBaScreen')}
            title={'Danh bạ'}
            iconLeft="address-book"
            colorIconLeft="#757575"
          />
        )} */}
        {user && (
          <ItemMenu
            onPress={() => navigation.navigate('BookmarksScreen')}
            title={'Đánh dấu'}
            iconLeft="bookmark"
            colorIconLeft="#757575"
          />
        )}

        <ItemMenu
          onPress={() => navigation.navigate('TrungTamTroGiupScreen')}
          title={'Trung tâm trợ giúp'}
          iconLeft="life-ring"
          colorIconLeft="#757575"
        />

        <ItemMenu
          onPress={() => {
            onShare();
          }}
          title={'Giới thiệu bạn bè'}
          iconLeft="share-alt"
          colorIconLeft="#757575"
        />

        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Cài đặt'}
          titleRight={'Mật khẩu & bảo mật'}
          iconLeft="cogs"
          colorIconLeft="#757575"
        />

        {user ? (
          <ItemMenu
            onPress={() => {
              dispatch(actions.logOut());
            }}
            title={'Đăng xuất'}
            iconLeft="sign-out-alt"
            colorIconLeft="#757575"
          />
        ) : (
          <>
            <ItemMenu
              onPress={() => navigation.navigate('LoginScreen')}
              title={'Đăng nhập'}
              iconLeft="sign-in-alt"
              colorIconLeft="#757575"
            />
            <ItemMenu
              onPress={() => navigation.navigate('RegisterScreen')}
              title={'Đăng ký'}
              iconLeft="registered"
              colorIconLeft="#757575"
            />
          </>
        )}

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
