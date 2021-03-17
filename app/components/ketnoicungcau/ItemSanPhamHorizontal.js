/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const ItemSanPhamHorizontal = (props) => {
  const {data, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('KNCC_SanPham_ChiTietScreen', {data: data})}
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
        style={{width: 100, height: 100}}
        source={data.img ? {uri: data.img} : require('../../Images/nn1.jpg')}
      />
      <View style={{flex: 1, marginStart: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>{data.owner}</Text>
          <Text style={{color: '#757575', fontSize: 12, lineHeight: 30}}>{data.date}</Text>
        </View>
        <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
          {data.title}
        </Text>
        <Text style={{color: '#757575', fontSize: 12, paddingVertical: 5, flex: 1}} numberOfLines={2}>
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

export default ItemSanPhamHorizontal;

const styles = StyleSheet.create({});
