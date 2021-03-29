/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

import {getLunarDate, getDayName} from '../../utils/amlich';

const Lich = () => {
  const ld = getLunarDate(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear());
  const al = getDayName(ld);

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <FontAwesome name="calendar-alt" size={16} color="#f44336" />
        <Text style={{fontWeight: '600', color: '#9E9E9E'}}> {moment().format('dddd').toUpperCase()}</Text>
      </View>
      <Text style={{fontWeight: '600', padding: 5}}>{moment().format('L')}</Text>
      <Text style={{fontWeight: '600', fontSize: 12}}>{al}</Text>
    </>
  );
};

export default Lich;

const styles = StyleSheet.create({});
