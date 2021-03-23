/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, TextInput, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Avatar} from 'react-native-elements';

import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {SwipeableGmail} from '../common';

const ItemDanhBa = (props) => {
  const {data, onPress, swipRight, swipLeft} = props;
  const showTime = props?.showTime ?? true;
  const showAddress = props?.showAddress ?? true;
  const showPhone = props?.showPhone ?? true;

  return (
    <SwipeableGmail swipRight={swipRight} swipLeft={swipLeft} item={data}>
      <TouchableOpacity
        onPress={() => {
          onPress(data);
        }}
        style={{
          padding: 10,
          flexDirection: 'row',
          borderRadius: 5,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottomColor: '#e0e0e0',
          borderBottomWidth: 0.5,
        }}>
        <Avatar
          size="large"
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          source={{
            uri: 'https://qldv.hanhchinhcong.net' + data.HotLine.image,
          }}
          overlayContainerStyle={{backgroundColor: '#E7E7E7'}}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              paddingTop: 0,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                flex: 1,
                paddingRight: 10,
                color: '#4D5458',
              }}>
              {data.HotLine.Detail}
            </Text>
          </View>
          {showTime && (
            <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
              <FontAwesome type="font-awesome" name="clock" color="#DB8568" size={14} />
              <Text
                style={{
                  color: '#757575',
                  flex: 1,
                  marginStart: 10,
                  fontSize: 12,
                }}>
                {`07:30 - 17:30`}
              </Text>
            </View>
          )}
          {showAddress && (
            <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
              <FontAwesome type="font-awesome" name="phone" color="#DB8568" size={14} />
              <Text
                style={{
                  color: '#757575',
                  flex: 1,
                  marginStart: 10,
                  fontSize: 12,
                }}>
                {data.HotLine.Phone}
              </Text>
            </View>
          )}
          {showPhone && (
            <View style={{flexDirection: 'row', padding: 5}}>
              <FontAwesome name="map-marker-alt" color="#DB8568" size={14} />
              <Text
                style={{
                  color: '#757575',
                  flex: 1,
                  marginStart: 10,
                  fontSize: 12,
                }}
                numberOfLines={2}>
                {data.HotLine.Address}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </SwipeableGmail>
  );
};

export default ItemDanhBa;

const styles = StyleSheet.create({});
