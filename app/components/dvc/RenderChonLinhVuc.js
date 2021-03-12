/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RenderItem = (props) => {
  const {isMultiChoice, item, handleCheckChieldElement} = props;
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
      }}
      onPress={() => handleCheckChieldElement(item)}
      key={item.code}>
      <Icon name={item.checked ? 'dot-circle' : 'circle'} color={'gray'} size={20} />
      <Text
        style={{
          color: '#1e1e1e',
          fontWeight: '500',
          fontSize: 15,
          marginStart: 10,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const ChonDonVi = (props) => {
  const {dataSo, dataQuanHuyen, dataPhuongXa, handleDongY, actionSheetRef, ModalHide} = props;
  const [inputValue, setInputValue] = useState('');

  const [listChoice_So, setListChoice_So] = useState(JSON.parse(JSON.stringify(dataSo)));
  const [listChoice_QuanHuyen, setListChoice_QuanHuyen] = useState(JSON.parse(JSON.stringify(dataQuanHuyen)));
  const [listChoice_PhuongXa, setListChoice_PhuongXa] = useState(JSON.parse(JSON.stringify(dataPhuongXa)));

  const handleCheckChieldElement = (itemChoice) => {
    handleDongY(itemChoice);
  };

  return (
    <View style={{padding: 15, marginBottom: 20, height: SCREEN_HEIGHT / 2}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            ModalHide();
          }}>
          <Icon name={'times'} size={20} color={'#161616'} />
        </TouchableOpacity>
        <Text style={{flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 16, color: '#161616'}}>{`Chọn lĩnh vực`}</Text>

        <TouchableOpacity
          onPress={() => {
            handleDongY({name: '', code: ''});
          }}>
          <Text style={{textAlign: 'center', fontSize: 14, color: '#161616'}}>Đặt lại</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#EAEAEA',
            flexDirection: 'row',
            borderRadius: 4,
            padding: 4,
            marginTop: 10,
            alignItems: 'center',
            flex: 1,
          }}>
          <Icon name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
          <TextInput
            placeholder={'Tìm kiếm'}
            multiline={false}
            onChangeText={(text) => {
              setInputValue(text);
            }}
            value={inputValue}
            selectionColor={'gray'}
            clearButtonMode="always"
            style={{flex: 1, margin: 10}}
          />
        </View>
      </View>
      <ScrollableTabView
        style={{flex: 1}}
        renderTabBar={() => <ScrollableTabBar />}
        initialPage={0}
        tabBarPosition="top"
        tabBarActiveTextColor="#757575"
        tabBarInactiveTextColor={'#BDBDBD'}
        tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
        <ScrollView
          tabLabel="Sở, Ban, Ngành"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => actionSheetRef.current?.handleChildScrollEnd()}
          onScrollAnimationEnd={() => actionSheetRef.current?.handleChildScrollEnd()}
          onMomentumScrollEnd={() => actionSheetRef.current?.handleChildScrollEnd()}>
          {listChoice_So
            .filter((item) => {
              const name = item.name.toUpperCase();
              return name.indexOf(inputValue.toUpperCase()) > -1;
            })
            .map((item) => (
              <RenderItem item={item} handleCheckChieldElement={handleCheckChieldElement} key={item.code} />
            ))}
        </ScrollView>
        <ScrollView
          tabLabel="Quận/Huyện"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => actionSheetRef.current?.handleChildScrollEnd()}
          onScrollAnimationEnd={() => actionSheetRef.current?.handleChildScrollEnd()}
          onMomentumScrollEnd={() => actionSheetRef.current?.handleChildScrollEnd()}>
          {listChoice_QuanHuyen
            .filter((item) => {
              const name = item.name.toUpperCase();
              return name.indexOf(inputValue.toUpperCase()) > -1;
            })
            .map((item) => (
              <RenderItem item={item} handleCheckChieldElement={handleCheckChieldElement} key={item.code} />
            ))}
        </ScrollView>
        <ScrollView
          tabLabel="Phường/Xã/Thị trấn"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={() => actionSheetRef.current?.handleChildScrollEnd()}
          onScrollAnimationEnd={() => actionSheetRef.current?.handleChildScrollEnd()}
          onMomentumScrollEnd={() => actionSheetRef.current?.handleChildScrollEnd()}>
          {listChoice_PhuongXa
            .filter((item) => {
              const name = item.name.toUpperCase();
              return name.indexOf(inputValue.toUpperCase()) > -1;
            })
            .map((item) => (
              <RenderItem item={item} handleCheckChieldElement={handleCheckChieldElement} key={item.code} />
            ))}
        </ScrollView>
      </ScrollableTabView>
    </View>
  );
};

export default ChonDonVi;

const styles = StyleSheet.create({});
