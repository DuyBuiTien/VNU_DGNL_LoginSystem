/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ItemMenuImage = (props) => {
  const {item} = props;
  const navigation = useNavigation();

  return (
    <View key={item.id} style={{width: '50%'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigate, {data: item.data});
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          margin: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          marginHorizontal: 20,
        }}>
        <ImageBackground imageStyle={{borderRadius: 10}} source={item.background} style={{width: '100%', height: 80}} />
        <Image source={item.icon} style={{width: 40, height: 40, margin: 20}} />
        <Text style={{height: 60, textAlign: 'center', marginHorizontal: 10, color: '#3B484E', fontWeight: '600'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemMenuImage;

const styles = StyleSheet.create({});
