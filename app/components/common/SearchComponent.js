/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const SearchComponent = ({value, onChangeText, placeholder, onSubmitEditing, keyboardType}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: '#EAEAEA',
          flexDirection: 'row',
          borderRadius: 4,
          margin: 10,
          alignItems: 'center',
          flex: 1,
        }}>
        <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
        <TextInput
          placeholder={placeholder ? placeholder : 'Tìm kiếm'}
          multiline={false}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          selectionColor={'gray'}
          clearButtonMode="always"
          style={{flex: 1, margin: 10, padding: 4}}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType ? keyboardType : 'default'}
        />
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({});
