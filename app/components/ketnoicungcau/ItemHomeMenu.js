/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const _w = Dimensions.get('screen').width < 500 ? 50 : 70;
const _h = Dimensions.get('screen').width < 500 ? 50 : 70;
const _b = Dimensions.get('screen').width < 500 ? 25 : 30;

const {width} = Dimensions.get('window');

const ItemDanhMuc = (props) => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      key={item.appid}
      onPress={() => navigation.navigate(item.navigate)}
      style={{justifyContent: 'center', alignItems: 'center', width: width / 4 - 2}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: _h,
          width: _w,
          backgroundColor: item.color,
          borderRadius: 1000,
        }}>
        <FontAwesome name={item.icon} color="#fff" size={_b} containerStyle={styles.icon} />
      </View>
      <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, fontSize: 13}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ItemDanhMuc;

const styles = StyleSheet.create({});
