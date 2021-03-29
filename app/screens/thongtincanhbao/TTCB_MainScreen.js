/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TTCB_HomeTab from './TTCB_HomeTab';
import TTCB_CategoryTab from './TTCB_CategoryTab';

import {Header} from '../../components';
import {SearchComponent} from '../../components/common';

const TTCB_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Thông tin cảnh báo" isStack={true} />

      <View style={{flex: 1}}>
        <SearchComponent value={inputValue} onChangeText={setInputValue} />

        <View style={{flex: 1}}>
          <ScrollableTabView
            style={{}}
            renderTabBar={() => <ScrollableTabBar />}
            initialPage={0}
            tabBarPosition="top"
            tabBarActiveTextColor="#757575"
            tabBarInactiveTextColor={'#BDBDBD'}
            tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
            <TTCB_HomeTab tabLabel="Trang chủ" />
            <TTCB_CategoryTab tabLabel="Chuyên mục" />
          </ScrollableTabView>
        </View>
      </View>
    </View>
  );
};

export default TTCB_MainScreen;

const styles = StyleSheet.create({});
