/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
//import {TouchableOpacity} from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RenderItem = (props) => {
  const {item, isMultiChoice, handleCheckChieldElement} = props;
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
      <Icon name={!item.checked ? 'check-square' : 'square'} color={'gray'} size={20} />

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
  const {data, handleDongY, actionSheetRef, ModalHide, title, isMultiChoice} = props;

  const [listChoice, setListChoice] = useState(data);

  const handleCheckChieldElement = (itemChoice) => {
    let filteredDataSource = data.filter((item) => {
      if (item.name === itemChoice.name) {
        item.checked = !item.checked;
      }
      return item;
    });
    setListChoice(filteredDataSource);
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
        <Text style={{flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 16, color: '#161616'}}>
          {title ? title : 'Lựa chọn'}
        </Text>

        <TouchableOpacity
          onPress={() => {
            handleDongY(listChoice);
          }}>
          <Text style={{textAlign: 'center', fontSize: 14, color: '#161616'}}>Đồng ý</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={() => actionSheetRef.current?.handleChildScrollEnd()}
        onScrollAnimationEnd={() => actionSheetRef.current?.handleChildScrollEnd()}
        onMomentumScrollEnd={() => actionSheetRef.current?.handleChildScrollEnd()}>
        {listChoice.map((item) => (
          <RenderItem
            item={item}
            handleCheckChieldElement={handleCheckChieldElement}
            key={item.code}
            isMultiChoice={isMultiChoice}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChonDonVi;

const styles = StyleSheet.create({});
