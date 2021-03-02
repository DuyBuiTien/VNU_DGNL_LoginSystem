/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, View, TouchableOpacity, PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

import LichHome from './LichHome';
import AQI from './AQI';

import * as actions from '../../redux/global/Actions';
import * as actionsOther from '../../redux/other/Actions';

const ThoiTietHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let dataAQI = useSelector((state) => state.other.dataAQI);

  let CurrentPosition = useSelector((state) => state.global.CurrentPosition);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }
    return false;
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasLocationPermission_ = await hasLocationPermission();

      if (!hasLocationPermission_) {
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          dispatch(actions.saveCurrentPosition({latitude: position.coords.latitude, longitude: position.coords.longitude}));
        },
        (error) => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true},
      );
    };
    getLocation();
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (CurrentPosition) {
      dispatch(actionsOther.fetchAQI(CurrentPosition.latitude, CurrentPosition.longitude));
      dispatch(actions.saveCurrentLocation(CurrentPosition.latitude, CurrentPosition.longitude));
    }
    return () => {};
  }, [CurrentPosition, dispatch]);

  return (
    <View
      style={{
        margin: 10,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: 'rgba(171, 180, 189, 0.35)',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        elevation: 5,
      }}>
      <View style={{flexDirection: 'row', padding: 5}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WebViewScreen', {
              title: 'Lịch',
              url: 'https://misc.zaloapp.com/calendar/v2/index.html',
              colorHeader: '#FFFAF3',
              hideBackForward: true,
            })
          }
          style={{flex: 1 / 2, alignItems: 'center', justifyContent: 'center'}}>
          <LichHome />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{flex: 1 / 2, alignItems: 'center', justifyContent: 'center'}}>
          <AQI
            aqi={
              dataAQI && dataAQI.current && dataAQI.current.pollution && dataAQI.current.pollution.aqius
                ? dataAQI.current.pollution.aqius
                : 0
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThoiTietHome;

const styles = StyleSheet.create({});
