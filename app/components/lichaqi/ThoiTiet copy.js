/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Image, ToastAndroid, PermissionsAndroid, View, Text, Platform, Dimensions, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import * as actions from '../../redux/global/Actions';
import * as actionsOther from '../../redux/other/Actions';

import {Images} from '../../config';

const _renderItem = (props) => {
  const {item, data, isTrangChu} = props;
  let CurrentLocation = useSelector((state) => state.global.CurrentLocation);

  let {temp, humidity} = data.main;
  temp = parseInt(temp, 10) - 273;

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', margin: 10}}>
      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 5}}>
        {weatherConditions[item.main] && (
          <Icon size={30} name={weatherConditions[item.main].icon} color={weatherConditions[item.main].color} />
        )}

        <View style={{paddingHorizontal: 10}}>
          <Text style={{color: isTrangChu ? '#fff' : '#3E4144', fontWeight: '500', marginBottom: 5, fontSize: 15}}>
            {temp}&#8451;{' '}
          </Text>
          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 5}}>
            <Icon name={'tint'} size={12} color={isTrangChu ? '#fff' : '#A6A6A7'} />
            <Text style={{color: isTrangChu ? '#fff' : '#A6A6A7', paddingHorizontal: 5, fontSize: 12}}>{`${humidity}%`}</Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 5}}>
        <Icon name={'map-marker-alt'} size={12} color={isTrangChu ? '#FFF' : '#A6A6A7'} />
        <Text style={{marginStart: 5, color: isTrangChu ? '#fff' : '#3E4144', fontWeight: '300', fontSize: 11}} numberOfLines={1}>
          {CurrentLocation}
        </Text>
      </View>
    </View>
  );
};

const _renderItemAQI = (props) => {
  const {data, isTrangChu} = props;
  let aqi = data && data.aqi ? data.aqi : 0;

  let color = '#69D056';
  let color_bg = '#69D05695';
  let avatar = Images.icons._aqi_green;

  if (aqi < 51) {
    color = '#69D056';
    color_bg = '#69D05695';
    avatar = Images.icons._aqi_green;
  } else if (aqi < 101) {
    color = '#FFDB4B';
    color_bg = '#FFDB4B95';
    avatar = Images.icons._aqi_yellow;
  } else if (aqi < 151) {
    color = '#FB6936';
    color_bg = '#FB693695';
    avatar = Images.icons._aqi_orange;
  } else if (aqi < 201) {
    color = '#E80027';
    color_bg = '#E8002795';
    avatar = Images.icons._aqi_red;
  } else if (aqi < 301) {
    color = '#A93383';
    color_bg = '#A9338395';
    avatar = Images.icons._aqi_purple;
  } else {
    color = '#8F363E';
    color_bg = '#8F363E95';
    avatar = Images.icons._aqi_purple;
  }

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color_bg,
        height: 70,
        width: 140,
        borderRadius: 10,
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: color,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: 'center',
          height: 70,
          width: 70,
          justifyContent: 'center',
        }}>
        <Image resizeMode="cover" source={avatar} style={{tintColor: isTrangChu ? '#FFF' : '#000', width: 50, height: 50}} />
      </View>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: isTrangChu ? '#FFF' : '#af2c3b', marginHorizontal: 5}}>{aqi}</Text>
        <Text style={{fontSize: 10, color: isTrangChu ? '#FFF' : '#af2c3b'}}>US AQI</Text>
      </View>
    </View>
  );
};

const Screen = (props) => {
  const {isTrangChu} = props;
  const navigation = useNavigation();

  const [dataweather, setdataweather] = useState({});
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
    const list = async () =>
      CurrentPosition &&
      (await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${CurrentPosition.latitude}&lon=${CurrentPosition.longitude}&APPID=f27de506261598e9f157ed99451eaeed&lang=vi`,
        )
        .then(function (response) {
          return response.data;
        })
        .then(function (data) {
          if (data) {
            setdataweather(data);

            //dispatch(actions.saveCurrentLocation(data.name));
          }
          return data;
        })
        .catch(function (error) {
          console.log(error);
        }));

    list();

    return () => {};
  }, [CurrentPosition, dispatch]);

  useEffect(() => {
    if (CurrentPosition) {
      dispatch(actionsOther.fetchAQI(CurrentPosition.latitude, CurrentPosition.longitude));
      dispatch(actions.saveCurrentLocation(CurrentPosition.latitude, CurrentPosition.longitude));
    }
    return () => {};
  }, [CurrentPosition, dispatch]);

  return (
    <TouchableOpacity
      style={[isTrangChu ? styles.itemNhacViecContainerTrangChu : styles.itemNhacViecContainer]}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('THOITIET_Main_Screen');
      }}>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <View style={{flex: 0.5, alignItems: 'center'}}>
          {dataweather && dataweather.weather && dataweather.weather.length > 0 && (
            <_renderItem item={dataweather.weather[0]} data={dataweather} isTrangChu={isTrangChu} />
          )}
        </View>

        <View style={{flex: 0.5, alignItems: 'center'}}>
          {dataAQI && <_renderItemAQI data={dataAQI} isTrangChu={isTrangChu} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Screen;

const styles = StyleSheet.create({
  itemNhacViecContainer: {
    marginTop: 5,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    height: 100,
    padding: 5,
    borderColor: '#abb4bd65',
    borderRadius: 10,
    shadowColor: '#abb4bd45',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemNhacViecContainerTrangChu: {
    marginTop: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff40',
    height: 100,
    padding: 5,
    borderColor: '#abb4bd65',
    borderRadius: 4,
    shadowColor: '#abb4bd45',
  },
});

const weatherConditions = {
  Rain: {
    color: '#076585',
    title: 'Raining',
    subtitle: 'Get a cup of coffee',
    icon: 'cloud-rain',
  },
  Clear: {
    color: '#f7b733',
    title: 'So Sunny',
    subtitle: 'It is hurting my eyes',
    icon: 'sun',
  },
  Thunderstorm: {
    color: '#616161',
    title: 'A Storm is coming',
    subtitle: 'Because Gods are angry',
    icon: 'poo-storm',
  },
  Clouds: {
    color: '#00d2ff',
    title: 'Clouds',
    subtitle: 'Everywhere',
    icon: 'cloud',
  },

  Snow: {
    color: '#00d2ff',
    title: 'Snow',
    subtitle: 'Get out and build a snowman for me',
    icon: 'snowflake',
  },
  Drizzle: {
    color: '#076585',
    title: 'Drizzle',
    subtitle: 'Partially raining...',
    icon: 'cloud-rain',
  },
  Haze: {
    color: '#66A6FF',
    title: 'Haze',
    subtitle: 'Another name for Partial Raining',
    icon: 'smog',
  },
  Mist: {
    color: '#3CD3AD',
    title: 'Mist',
    subtitle: "Don't roam in forests!",
    icon: 'smog',
  },
  Fog: {
    color: '#3CD3AD',
    title: 'Mist',
    subtitle: "Don't roam in forests!",
    icon: 'smog',
  },
};
