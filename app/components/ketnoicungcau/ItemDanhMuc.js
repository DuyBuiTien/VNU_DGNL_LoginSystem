/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const _w = Dimensions.get('screen').width < 500 ? 50 : 70;

const {width} = Dimensions.get('window');

const ItemDanhMuc = (props) => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      key={item.Id}
      onPress={() => navigation.navigate('KNCC_DanhMucScreen', {id: item.Id, title: item.Title})}
      style={{justifyContent: 'center', alignItems: 'center', width: width / 4 - 2, marginVertical: 10}}>
      <ImageBackground
        resizeMethod="resize"
        imageStyle={{borderRadius: 8}}
        style={{height: 60, width: 60, resizeMode: 'cover', aspectRatio: 1}}
        source={{uri: item.Image}}
      />
      <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, fontSize: 13}}>{item.Title}</Text>
    </TouchableOpacity>
  );
};

export default ItemDanhMuc;

const styles = StyleSheet.create({});
