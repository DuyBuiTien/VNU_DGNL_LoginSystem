/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Linking, Dimensions, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Clipboard from '@react-native-clipboard/clipboard';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data ?? {};

  const handlePhoneCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const handleCopy = (noidung) => {
    Clipboard.setString(noidung);
  };

  const handleOpenMap = (latitude, longitude) => {
    const url = Platform.select({
      ios: `maps:${latitude},${longitude}`,
      android: `google.navigation:q=${latitude}+${longitude}`,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url = 'https://www.google.de/maps/@' + latitude + ',' + longitude + '?q=';
        return Linking.openURL(browser_url);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="dark-content"
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back'}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: `${data.name}`,
          style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
        }}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name={'bookmark'} color="#2E2E2E" containerStyle={{paddingStart: 0}} onPress={() => {}} size={20} />
          </View>
        }
        containerStyle={{backgroundColor: 'transparent', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <View style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Image style={{height: 240, width: '100%', resizeMode: 'stretch'}} source={{uri: data.imageUrl}} />
          <View style={{flex: 1, padding: 15}}>
            <Text style={{color: '#F23A27'}}>{data.type}</Text>
            <Text style={{marginTop: 15, fontWeight: 'bold', color: '#424242', fontSize: 16}}>{data.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'clock'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Giờ mở cửa</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>{data?.giomuacua ?? 'Đang cập nhật'}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'clock'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Đóng cửa</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>{data?.giodongcua ?? 'Đang cập nhật'}</Text>
            </View>
            <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

            <MapView
              provider={PROVIDER_GOOGLE}
              style={{height: 200, marginTop: 10}}
              region={{
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude),
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              showsUserLocation={true}>
              <MapView.Marker
                coordinate={{latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude)}}
                draggable
              />
            </MapView>

            <Divider style={{backgroundColor: '#ff6e40', marginTop: 10}} />

            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  name={'map-marker-alt'}
                  color="#F23A27"
                  containerStyle={{paddingStart: 0}}
                  onPress={() => {}}
                  size={15}
                />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Địa chỉ</Text>
              </View>
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.diachi}</Text>

              <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    padding: 10,
                    borderRadius: 100,
                  }}
                  onPress={() => {
                    handleCopy(data.diachi);
                  }}>
                  <FontAwesome name={'copy'} color="#F23A27" containerStyle={{paddingStart: 0}} size={15} />
                  <Text style={{marginStart: 20, color: '#424242'}}>{'Sao chép'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    padding: 10,
                    borderRadius: 100,
                  }}
                  onPress={() => {
                    handleOpenMap(data.latitude, data.longitude);
                  }}>
                  <FontAwesome name={'map-marked-alt'} color="#F23A27" containerStyle={{paddingStart: 0}} size={15} />
                  <Text style={{marginStart: 20, color: '#424242'}}>{'Chỉ đường'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Điện thoại</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.sodienthoai}</Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    padding: 10,
                    borderRadius: 100,
                  }}
                  onPress={() => {
                    handlePhoneCall(data.sodienthoai);
                  }}>
                  <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} />
                  <Text style={{marginStart: 20, color: '#424242'}}>{'Gọi ngay'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name={'globe'} color="#F23A27" containerStyle={{paddingStart: 0}} size={15} />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Website</Text>
              </View>
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.website}</Text>
            </View>
            <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  name={'info-circle'}
                  color="#F23A27"
                  containerStyle={{paddingStart: 0}}
                  onPress={() => {}}
                  size={15}
                />
                <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Mô tả</Text>
              </View>
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.mota}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
