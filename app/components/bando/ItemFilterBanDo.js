/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
const ItemFilterBanDo = (props) => {
  const {item, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        {
          padding: 10,
          margin: 5,
          borderRadius: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          borderColor: '#abb4bd65',
          shadowRadius: 2,
          elevation: 2,
        },
        {backgroundColor: !item.selected ? '#FFF' : '#EEE'},
      ]}>
      <FontAwesome size={16} name={item?.icon ?? 'gas-pump'} color={'#EF6C00'} />

      <Text style={{color: '#37474f', marginStart: 10, fontWeight: 'normal'}} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemFilterBanDo;

const styles = StyleSheet.create({});

//selected
