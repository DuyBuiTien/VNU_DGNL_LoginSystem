/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, FlatList, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DANHMUC, CM_Data, TDT_Data} from '../../data/TMDT_Data';

const RenderItem = (props) => {
    const {data, navigation} = props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('')}
        style={{
          flexDirection: 'row',
          padding: 10,
          margin: 5,
          alignItems: 'flex-start',
          borderBottomWidth: 0.5,
          borderBottomColor: '#e8e8e8',
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 5}}
          resizeMode="cover"
          style={{width: 100, height: '100%'}}
          source={data.img?{uri: data.img}:require('../../Images/nn1.jpg')}
        />
        <View style={{flex: 1, marginStart: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>{data.owner}</Text>
            <Text style={{color: '#757575', fontSize: 12, lineHeight: 30}}>{data.date}</Text>
          </View>
          <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
            {data.title}
          </Text>
          <Text style={{color: '#757575',fontSize: 12, paddingVertical: 5, flex: 1}} numberOfLines={2}>
            {data.content}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <FontAwesome name="map-marker-alt" color="#757575" size={16} />
            <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
              {data.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

const KNCC_TDT_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  const [data, setData] = useState(TDT_Data);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {

    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Cần mua" isStack={true} />
      <View style={{flex: 1}}>
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
        <FlatList
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
            )}
          />
      </View>
    </View>
  );
};

export default KNCC_TDT_MainScreen;

const styles = StyleSheet.create({});
