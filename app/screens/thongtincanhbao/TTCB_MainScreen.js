/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TTCB_HomeTab from './TTCB_HomeTab'
import TTCB_CategoryTab from './TTCB_CategoryTab'

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';

const TTCB_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Thông tin cảnh báo" isStack={true} />
      <ScrollView>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#EAEAEA',
                  flexDirection: 'row',
                  borderRadius: 4,
                  padding: 4,
                  margin: 10,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
                <TextInput
                  placeholder={'Tìm kiếm'}
                  multiline={false}
                  onChangeText={(text) => {
                    setInputValue(text);
                  }}
                  value={inputValue}
                  selectionColor={'gray'}
                  onSubmitEditing={() => {}}
                  clearButtonMode="always"
                  style={{flex: 1, margin: 10, fontSize: 15}}
                  keyboardType={'web-search'}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              <ScrollableTabView
                style={{}}
                renderTabBar={() => <ScrollableTabBar />}
                initialPage={0}
                tabBarPosition="top"
                tabBarActiveTextColor="#757575"
                tabBarInactiveTextColor={'#BDBDBD'}
                tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
                <View tabLabel="Trang chủ" style={styles.tabView}>
                    <TTCB_HomeTab />
                </View>
                <View tabLabel="Chuyên mục" style={styles.tabView}>
                    <TTCB_CategoryTab />
                </View>
              </ScrollableTabView>
            </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default TTCB_MainScreen;

const styles = StyleSheet.create({});
