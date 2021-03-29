/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Dimensions, ImageBackground, Image, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const SCREEN_WIDTH = Dimensions.get('window').width;

import {TouchableOpacity} from 'react-native-gesture-handler';

const ItemMenuImage = (props) => {
  const {item, index} = props;
  const navigation = useNavigation();

  return (
    <View key={index} style={{width: SCREEN_WIDTH / 2 - 10, margin: 5}}>
      <TouchableOpacity
        onPress={() => {
          if (item.navigate && item.navigate.length > 1) {
            navigation.navigate(item.navigate, {data: item.data, title: item.name});
          } else {
            if (item.APP_STORE_LINK && item.PLAY_STORE_LINK) {
              if (Platform.OS === 'ios') {
                Linking.openURL(item.APP_STORE_LINK).catch((err) => console.error('An error occurred', err));
              } else {
                Linking.openURL(item.PLAY_STORE_LINK).catch((err) => console.error('An error occurred', err));
              }
            }
          }
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
          borderColor: '#abb4bd65',
          shadowRadius: 2,
          elevation: 2,
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 10}}
          source={item.background ? item.background : {uri: item.background_uri}}
          style={{width: '100%', height: 80}}
        />
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
