/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Linking, Dimensions, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Clipboard from '@react-native-clipboard/clipboard';
import { requestGET } from '../../services/Api';
import { useSelector, useDispatch } from 'react-redux';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data ?? {};
  const dataService = useSelector((state) => state.global.dataService);

  const fetchData = async () => {
    var data3 = await requestGET(`${dataService.KNCC_URL}/SupplyDemand/ViewCount/${data.Id}`)
    console.log(data3)
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

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

  const handleOpenMap = (latitude, longitude) => {};

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
          text: `${data.Title}`,
          style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
        }}
        containerStyle={{backgroundColor: 'transparent', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <View style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Image style={{height: 240, width: '100%', resizeMode: 'stretch'}} source={{uri: data.Images}} />
          <View style={{flex: 1, padding: 15}}>
            <Text style={{color: '#F23A27'}}>{data.owner}</Text>
            <Text style={{marginTop: 15, fontWeight: 'bold', color: '#424242', fontSize: 16}}>{data.Content}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
              <FontAwesome name={'clock'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
              <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Ngày đăng</Text>
              <Text style={{marginHorizontal: 10, color: '#ff6e40'}}>{data?.date ?? 'Đang cập nhật'}</Text>
            </View>

            <Divider style={{backgroundColor: '#ff6e40', marginTop: 15}} />

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
              <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.Address}</Text>

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
                    handleCopy(data.Address);
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
                    //handleOpenMap(data.latitude, data.longitude);
                  }}>
                  <FontAwesome name={'map-marked-alt'} color="#F23A27" containerStyle={{paddingStart: 0}} size={15} />
                  <Text style={{marginStart: 20, color: '#424242'}}>{'Chỉ đường'}</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} onPress={() => {}} size={15} />
                  <Text style={{marginStart: 10, flex: 1, color: '#424242', fontWeight: '600'}}>Điện thoại</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                  <Text style={{marginStart: 20, flex: 1, color: '#424242'}}>{data.Phone}</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#eeeeee',
                      padding: 10,
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      handlePhoneCall(data.Phone);
                    }}>
                    <FontAwesome name={'phone'} color="#F23A27" containerStyle={{paddingStart: 0}} />
                    <Text style={{marginStart: 20, color: '#424242'}}>{'Gọi ngay'}</Text>
                  </TouchableOpacity>
                </View>
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
                <Text style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>{data.Content}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row', borderWidth: 0.5, borderColor: 'gray'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#e65100'}}>
          <FontAwesome name="phone-volume" size={20} color="#FFF" />
          <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Gọi điện</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#26a69a'}}>
          <FontAwesome name="sms" size={20} color="#FFF" />
          <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Gửi SMS</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#1976d2'}}>
          <FontAwesome name="comments" size={20} color="#FFF" />
          <Text style={{fontWeight: '600', color: '#FFF', margin: 5}}>Chat</Text>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
