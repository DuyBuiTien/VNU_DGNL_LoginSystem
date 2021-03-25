/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

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
        borderRadius: 5,
        borderBottomWidth: 0.4,
        borderColor: 'gray',
      }}
      onPress={() => handleCheckChieldElement(item)}
      key={item.code}>
      <Text
        style={{
          color: '#455a64',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        {item.PathWithType ? item.PathWithType : item.NameWithType}
      </Text>
    </TouchableOpacity>
  );
};

const ChonDonVi = (props) => {
  const [inputValue, setInputValue] = useState('');
  const {data, handleDongY, actionSheetRef, ModalHide, title} = props;
  let user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const [listChoice, setListChoice] = useState(data);

  const [dataDiaDiem, setDataDiaDiem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var config = {
        method: 'get',
        url: `${dataService.BOOKMARK_URL}/v1/area?page=0&perpage=50&q=${inputValue}`,
      };
      let response = await axios(config);
      if (response.data && response.data.data) {
        setDataDiaDiem(response.data.data);
      }
      console.log(response.data.data);
      setIsLoading(false);
    };
    fetchData();
    return () => {
      setDataDiaDiem([]);
    };
  }, [dataService.BOOKMARK_URL, inputValue]);

  //http://demo.tandan.com.vn:8084/v1/area?q=cổ lễ

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
        <Text style={{flex: 1, textAlign: 'center', fontWeight: '600', fontSize: 16, color: '#161616'}}>
          {title ? title : 'Lựa chọn'}
        </Text>
      </View>
      <SearchComponent value={inputValue} onChangeText={setInputValue} />

      <ScrollView
        style={{marginTop: 10}}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={() => actionSheetRef.current?.handleChildScrollEnd()}
        onScrollAnimationEnd={() => actionSheetRef.current?.handleChildScrollEnd()}
        onMomentumScrollEnd={() => actionSheetRef.current?.handleChildScrollEnd()}>
        {dataDiaDiem.map((item) => (
          <RenderItem item={item} handleCheckChieldElement={handleDongY} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChonDonVi;

const styles = StyleSheet.create({});
