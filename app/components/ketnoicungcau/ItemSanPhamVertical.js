/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
const {width} = Dimensions.get('window');

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const ItemSanPhamVertical = (props) => {
  const {data, navigation} = props;

  return (
    <TouchableOpacity
      key={data.appid}
      onPress={() => navigation.navigate('KNCC_SanPham_ChiTietScreen', {data: data})}
      style={{width: width / 2 - 20, margin: 10}}>
      <ImageBackground
        imageStyle={{borderRadius: 5}}
        resizeMode="cover"
        style={{width: '100%', height: 100}}
        source={data.Images ? {uri: data.Images} : require('../../Images/nn1.jpg')}
      />
      <Text style={{paddingTop: 10, fontSize: 13}} numberOfLines={2}>
        {data.Title}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
        <FontAwesome name="calendar-alt" size={13} color="#9e9e9e" />
        <Text style={{marginStart: 5, fontSize: 12, color: '#9e9e9e'}} numberOfLines={1}>
          {moment(data.FromDate).format('L')}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
        <FontAwesome name="map-marker-alt" size={13} color="#9e9e9e" />
        <Text style={{marginStart: 5, fontSize: 12, color: '#9e9e9e', flex: 1}} numberOfLines={1}>
          {data.Address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSanPhamVertical;

const styles = StyleSheet.create({});
