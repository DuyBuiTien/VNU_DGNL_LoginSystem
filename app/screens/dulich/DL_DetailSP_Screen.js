/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data ?? {};

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
          text: `${data.Ten}`,
          style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
        }}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name={'share-alt'} color="#2E2E2E" containerStyle={{paddingStart: 0}} onPress={() => {}} size={20} />
          </View>
        }
        containerStyle={{backgroundColor: 'transparent', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <View style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Image
            style={{height: 240, width: '100%', resizeMode: 'stretch'}}
            source={{
              uri:
                data.AnhDaiDien && data.AnhDaiDien.length > 5
                  ? data.AnhDaiDien
                  : 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/14/ninh-thuan-thi-truong-day-hua-hen-cua-gioi-dau-tu-bds.jpg',
            }}
          />
          <View style={{flex: 1, padding: 15}}>
            <Text style={{color: '#F23A27'}}>{data.type}</Text>
            <Text style={{marginTop: 15, fontWeight: 'bold', color: '#424242', fontSize: 16}}>{data.Ten}</Text>

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
              <Text
                style={{
                  marginStart: 20,
                  marginTop: 10,
                  flex: 1,
                  color: '#424242',
                }}>{`${data.Xa}, ${data.Huyen}, ${data.Tinh} `}</Text>
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
              <View style={{marginStart: 20, marginTop: 10, flex: 1, color: '#424242'}}>
                <HTMLView value={data.MoTa} stylesheet={styles} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    margin: 0,
  },
});
