/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const ItemMenuImage = (props) => {
  const {item} = props;
  const navigation = useNavigation();

  return (
    <View key={item.id} style={{width: '50%'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigate, {data: item.data, title: item.name});
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
        <View
          style={{
            height: 20,
            borderTopEndRadius: 200,
            borderTopStartRadius: 200,
            top: -20,
            backgroundColor: '#FFF',
            width: '100%',
          }}
        />
        {item.iconClass ? (
          <FontAwesome
            name={item.iconClass}
            size={40}
            style={{width: 50, height: 50, margin: 15, marginTop: 0}}
            color={'#4D5458'}
          />
        ) : (
          <Image source={item.icon} style={{width: 50, height: 50, margin: 15, marginTop: 0}} />
        )}
        <Text style={{height: 60, textAlign: 'center', marginHorizontal: 10, color: '#3B484E', fontWeight: '600'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemMenuImage;

const styles = StyleSheet.create({});
