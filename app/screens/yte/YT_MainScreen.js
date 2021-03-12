/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Linking, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Header, Icon} from 'react-native-elements';

import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DANHMUC} from '../../data/YT_Data';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

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
          text: 'Y tế',
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(Platform.OS === 'android' ? 'tel:115' : 'telprompt:115');
            }}
            style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'red', padding: 5, borderRadius: 100}}>
            <Icon name={'call'} color="#FFF" underlayColor="#00000000" containerStyle={{paddingStart: 0}} />
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>115</Text>
          </TouchableOpacity>
        }
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {DANHMUC.map((item, index) => (
            <ItemMenuImage item={item} index={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
