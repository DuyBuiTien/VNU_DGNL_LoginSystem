/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Button} from 'react-native-elements';

import {Header} from '../../components';

const MainScreen = () => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Tổng hợp ý kiến" isStack={true} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#EAEAEA',
            flexDirection: 'row',
            borderRadius: 8,
            padding: 4,
            margin: 10,
            alignItems: 'center',
            flex: 1,
          }}>
          <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
          <TextInput
            placeholder={'Tìm kiếm'}
            multiline={false}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            selectionColor={'gray'}
            clearButtonMode="always"
            style={{flex: 1, margin: 10, fontSize: 15}}
          />
        </View>
        <FontAwesome name="filter" color="#787C7E" size={20} style={{marginHorizontal: 10}} />
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
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="Mới nhất"
            style={{backgroundColor: 'transparent', flex: 1, padding: 10}}>
            <></>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="Đang xử lý"
            style={{backgroundColor: 'transparent', flex: 1}}>
            <View style={{margin: 15, flexDirection: 'row'}}>
              <FontAwesome name="code-branch" type="font-awesome" color="#f44336" size={18} />
              <View style={{marginStart: 10, flex: 1}}>
                <Text style={{color: '#343F46', fontSize: 16, textTransform: 'uppercase'}}>Đơn vị cung cấp</Text>
              </View>
            </View>
          </ScrollView>
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="Đã xử lý"
            style={{backgroundColor: 'transparent', flex: 1, padding: 10}}>
            <></>
          </View>
          <View
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            tabLabel="Cá nhân"
            style={{backgroundColor: 'transparent', flex: 1, padding: 10}}>
            <></>
          </View>
        </ScrollableTabView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          title="Gửi phản ánh"
          titleStyle={{fontSize: 16, color: '#fff', fontWeight: '600'}}
          containerStyle={{margin: 10, marginHorizontal: 50, marginBottom: 30}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
          onPress={() => {
            navigation.navigate('PAHT_ThemMoiScreen');
          }}
        />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
