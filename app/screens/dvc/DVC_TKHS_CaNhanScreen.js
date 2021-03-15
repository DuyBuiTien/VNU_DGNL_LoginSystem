/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DANHMUC} from '../../data/DVC_Data';

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  let arr = [
    {
      id: 1,
      name: 'Tất cả',
    },
    {
      id: 1,
      name: 'Chưa gửi',
    },
    {
      id: 1,
      name: 'Đã gửi',
    },
    {
      id: 1,
      name: 'Đã nhận',
    },
    {
      id: 1,
      name: 'Chờ bổ sung',
    },
    {
      id: 1,
      name: 'Chờ bổ sung tiếp nhận',
    },
    {
      id: 1,
      name: 'Có kết quả',
    },
    {
      id: 1,
      name: 'Trả kết quả',
    },
    {
      id: 1,
      name: 'Không tiếp nhận',
    },
    {
      id: 1,
      name: 'Trả lại',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Hồ sơ cá nhân" isStack={true} />
      <ScrollView>
        {!user ? (
          <BlockLogin name="Dịch vụ công" />
        ) : (
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
                  style={{flex: 1}}
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
                {arr.map((item) => (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    tabLabel={item.name}
                    style={{backgroundColor: 'transparent', flex: 1}}>
                    <View style={{marginStart: 10, flex: 1}} />
                  </ScrollView>
                ))}
              </ScrollableTabView>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});
