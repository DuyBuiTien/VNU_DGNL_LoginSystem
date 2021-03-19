/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const ItemTextInput = (props) => {
  const {isChecked, setChecked, title} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setChecked(!isChecked);
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <FontAwesome name={isChecked ? 'check-square' : 'square'} color="#787C7E" size={20} style={styles.textinputIcon} />
        <Text style={{marginHorizontal: 10, color: '#5B6062', fontWeight: '600'}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemTextInput;
const styles = StyleSheet.create({
  container: {flex: 1},

  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  textinput: {flex: 1, paddingVertical: 10},
  textinputIcon: {marginHorizontal: 10},
});
