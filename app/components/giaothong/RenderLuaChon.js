/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
//import {TouchableOpacity} from 'react-native-gesture-handler';

import {SearchComponent} from '../common';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RenderItem = (props) => {
  const {item, handleCheckChieldElement} = props;
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        margin: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => handleCheckChieldElement(item)}
      key={item.code}>
      <Text
        style={{
          color: '#455a64',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        {item.Name}
      </Text>
    </TouchableOpacity>
  );
};

const ChonDonVi = (props) => {
  const {data, handleDongY, actionSheetRef, ModalHide, title} = props;

  return (
    <View style={{padding: 15, marginBottom: 20, height: SCREEN_HEIGHT / 2}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 0.5,
          borderColor: 'gray',
          paddingBottom: 10,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            ModalHide();
          }}>
          <Icon name={'times'} size={20} color={'#161616'} />
        </TouchableOpacity>
        <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#161616'}}>
          {title ? title : 'Lựa chọn'}
        </Text>

        <TouchableOpacity
          onPress={() => {
            handleDongY({Name: ''});
          }}>
          <Text style={{fontWeight: '300', fontSize: 14, color: '#161616'}}>{'Đặt lại'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{marginTop: 10}}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={() => actionSheetRef.current?.handleChildScrollEnd()}
        onScrollAnimationEnd={() => actionSheetRef.current?.handleChildScrollEnd()}
        onMomentumScrollEnd={() => actionSheetRef.current?.handleChildScrollEnd()}>
        {data.map((item) => (
          <RenderItem item={item} handleCheckChieldElement={handleDongY} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChonDonVi;

const styles = StyleSheet.create({});
