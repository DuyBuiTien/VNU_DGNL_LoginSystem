/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const HeaderList = (props) => {
  return (
    <View style={styles.viewHeader}>
      <Text style={styles.textHeaderTitle}>{props.title}</Text>
      <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={0.8} onPress={props.onPress}>
        <FontAwesome name="chevron-down" size={16} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  viewHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 5,
    paddingStart: 5,
    paddingEnd: 15,
    marginVertical: 10,
    marginStart: 10,
    flexDirection: 'row',
    borderLeftWidth: 2,
    borderLeftColor: '#f44336',
  },
  textHeaderTitle: {fontSize: 18, color: '#3D4458', fontWeight: '500'},
});
