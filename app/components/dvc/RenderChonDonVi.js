/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RenderItem = (props) => {
  const {isMultiChoice, item, handleCheckChieldElement, key} = props;
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
      onPress={() => handleCheckChieldElement(item)}>
      {isMultiChoice ? (
        <Icon name={item.checked ? 'check-square' : 'square'} color={'gray'} size={20} />
      ) : (
        <Icon name={item.checked ? 'dot-circle' : 'circle'} color={'gray'} size={20} />
      )}
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
  const {dataSo, dataQuanHuyen, dataPhuongXa, isMultiChoice, handleDongY} = props;

  console.log('RENDER');

  const [listChoice_So, setListChoice_So] = useState(JSON.parse(JSON.stringify(dataSo)));
  const [listChoice_QuanHuyen, setListChoice_QuanHuyen] = useState(JSON.parse(JSON.stringify(dataQuanHuyen)));
  const [listChoice_PhuongXa, setListChoice_PhuongXa] = useState(JSON.parse(JSON.stringify(dataPhuongXa)));

  const handleCheckChieldElement = (itemChoice) => {
    handleDongY(itemChoice);
  };

  return (
    <View style={{padding: 15, marginBottom: 20, height: SCREEN_HEIGHT / 2}}>
      <Text>Chọn đơn vị</Text>
      <ScrollableTabView
        style={{flex: 1}}
        renderTabBar={() => <ScrollableTabBar />}
        initialPage={0}
        tabBarPosition="top"
        tabBarActiveTextColor="#757575"
        tabBarInactiveTextColor={'#BDBDBD'}
        tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
        <View tabLabel="Sở, Ban, Ngành" style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={listChoice_So}
            renderItem={({item, index}) => (
              <RenderItem item={item} handleCheckChieldElement={handleCheckChieldElement} key={item.code} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View tabLabel="Quận/Huyện" style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={listChoice_QuanHuyen}
            renderItem={({item, index}) => (
              <RenderItem item={item} handleCheckChieldElement={handleCheckChieldElement} key={item.code} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View tabLabel="Phường/Xã/Thị trấn" style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={listChoice_PhuongXa}
            renderItem={({item, index}) => (
              <RenderItem item={item} handleCheckChieldElement={handleCheckChieldElement} key={item.code} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollableTabView>
    </View>
  );
};

export default ChonDonVi;

const styles = StyleSheet.create({});
