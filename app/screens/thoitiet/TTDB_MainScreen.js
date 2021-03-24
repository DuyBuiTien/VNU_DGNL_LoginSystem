/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

import { requestGET } from '../../services/Api';
import { ScrollView } from 'react-native-gesture-handler';

const _renderItemDaily = (props) => {
  const { item } = props;

  let day = item ? item.day : null;

  if (!day) {
    day = item.night;
  }

  return (
    <View style={{ margin: 10, alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 5, fontSize: 16 }}>{day.daypart_name}</Text>

      <Image
        style={{ height: 30, width: 30 }}
        source={{
          uri: `https://doc.media.weather.com/products/icons/${day.icon_code}.png`,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
        <Icon name={'humidity'} size={10} color="#FFF" />
        <Text style={{ color: '#FFFFFF', textAlign: 'center', margin: 2, fontSize: 12 }}>{day.pop}%</Text>
      </View>
      <View style={{ flex: 1 }} />
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Text style={{ color: 'white' }}>{`${item ? item.max_temp : ''}°`}</Text>
        <View style={{ width: 5, borderRadius: 10, height: (day.temp - 15) * 5, backgroundColor: 'white' }} />
        <Text style={{ color: 'white' }}>{`${item ? item.min_temp : ''}°`}</Text>
      </View>
    </View>
  );
};

const _renderItem = (props) => {
  const { item } = props;
  return (
    <View style={{ margin: 10, alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', textAlign: 'center', marginBottom: 5, fontSize: 16 }}>
        {moment.unix(item.fcst_valid).format('hh:mm')}
      </Text>
      <Image
        style={{ height: 30, width: 30 }}
        source={{
          uri: `https://doc.media.weather.com/products/icons/${item.icon_code}.png`,
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
        <Icon name={'humidity'} size={10} color="#FFF" />
        <Text style={{ color: '#FFFFFF', textAlign: 'center', margin: 2, fontSize: 12 }}>{item.pop}%</Text>
      </View>

      <View style={{ flex: 1 }} />
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Text style={{ color: 'white' }}>{`${item.temp}°`}</Text>
        <View style={{ width: 5, borderRadius: 10, height: (item.temp - 15) * 5, backgroundColor: 'white' }} />
      </View>
    </View>
  );
};

const Main_Screen = (props) => {
  const navigation = useNavigation();
  const route = useRoute()
  const [daily, setDaily] = useState(null);
  const [hourly, setHourly] = useState(null);

  const { aqi } = route.params

  var now = moment();

  let ngay = now.format('D');
  let thang = now.format('M');
  let nam = now.format('YYYY');

  let CurrentPosition = useSelector((state) => state.global.CurrentPosition);
  let CurrentLocation = useSelector((state) => state.global.CurrentLocation);

  useEffect(() => {
    const fetchDataDaily = async () => {
      if (CurrentPosition) {
        var data1 = await requestGET(`https://api.weather.com/v1/geocode/${CurrentPosition.latitude}/${CurrentPosition.longitude}/forecast/daily/7day.json?units=m&language=vi-VN&apiKey=d522aa97197fd864d36b418f39ebb323`)
        if (data1 && data1.forecasts) {
          setDaily(data1.forecasts);
        }
      }
    };

    fetchDataDaily();
  }, [CurrentPosition]);

  useEffect(() => {
    const fetchDataHourly = async () => {
      if (CurrentPosition) {
        var data1 = await requestGET(`https://api.weather.com/v1/geocode/${CurrentPosition.latitude}/${CurrentPosition.longitude}/forecast/hourly/12hour.json?units=m&language=vi-VN&apiKey=d522aa97197fd864d36b418f39ebb323`)
        if (data1 && data1.forecasts) {
          setHourly(data1.forecasts);
        }
      }
    };
    fetchDataHourly();
  }, [CurrentPosition]);

  if (daily == null || hourly == null) {
    return (
      <ImageBackground resizeMode="cover" source={require('../../Images/weather_bg.jpg')} style={{ flex: 1 }} imageStyle={{ opacity: 1 }} />
    );
  }

  return (
    <ImageBackground resizeMode="cover" source={require('../../Images/weather_bg.jpg')} style={{ flex: 1 }} imageStyle={{ opacity: 1 }}>
      <Icon onPress={() => navigation.goBack()} name={'arrow-left'} size={25} color="#FFF" style={{ paddingTop: 40, paddingLeft: 20, paddingBottom: 10 }} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 40,
          marginVertical: 10,
        }}>
        <Icon name={'map-marker-alt'} size={12} color="#FFF" />
        <Text style={{ color: 'white', textAlign: 'center', marginStart: 10, fontWeight: 'bold', fontSize: 20 }}>
          {CurrentLocation}
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{ color: '#FFFFFF80', textAlign: 'center', fontWeight: '300' }}>{`${ngay}, tháng ${thang}, năm ${nam}`}</Text>

          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ height: 50, width: 50 }}
              source={{
                uri: `https://doc.media.weather.com/products/icons/${hourly[0].icon_code}.png`,
              }}
            />
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginStart: 20,
                fontSize: 80,
                fontWeight: '300',
              }}>
              {`${hourly[0].temp}`}
            </Text>
            <Text style={{ color: 'white' }}>&#8451;</Text>
          </View>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {`${hourly[0].hi}°/${hourly[0].dewpt}° Cảm giác như ${hourly[0].feels_like}°`}
          </Text>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 10, fontSize: 16 }}>{`${hourly[0].phrase_32char}`}</Text>

          <View
            style={{
              backgroundColor: '#FFFFFF70',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              borderRadius: 15,
              marginTop: 20,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Icon name={'smog'} size={20} color="#FFF" />
              <View style={{ margin: 15 }}>
                <Text style={{ color: 'white'}}>{'Chỉ số AQI'}</Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>{`${aqi}`}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Icon name={'humidity'} size={20} color="#FFF" />
              <View style={{ margin: 15 }}>
                <Text style={{ color: 'white'}}>{'Lượng mưa'}</Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>{`${hourly[0].pop}%`}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Icon name={'sun'} size={20} color="#FFF" />
              <View style={{ margin: 15 }}>
                <Text style={{ color: 'white'}}>{'Chỉ số UV'}</Text>
                <Text style={{ color: 'white', fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>{`${hourly[0].uv_desc}`}</Text>
              </View>
            </View>
          </View>

          <Text style={{ color: 'white', margin: 10, marginTop: 20 }}>{'Hàng giờ'}</Text>

          <View
            style={{
              backgroundColor: '#FFFFFF70',
              alignItems: 'center',
              padding: 20,
              paddingHorizontal: 30,
              borderRadius: 15,
              marginTop: 0,
            }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {hourly.map((item, key) => (
                <_renderItem key={key} item={item} />
              ))}
            </ScrollView>
          </View>

          <Text style={{ color: 'white', margin: 10, marginTop: 20 }}>{'Hàng ngày'}</Text>

          <View
            style={{
              backgroundColor: '#FFFFFF70',
              alignItems: 'center',
              padding: 20,
              paddingHorizontal: 30,
              borderRadius: 15,
              marginTop: 0,
            }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {daily.map((item, key) => (
                <_renderItemDaily key={key} item={item} />
              ))}
            </ScrollView>
          </View>

          <Text style={{ color: 'white', margin: 10, marginTop: 20 }}>{'Chi tiết'}</Text>

          <View
            style={{
              backgroundColor: '#FFFFFF70',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              paddingHorizontal: 30,
              borderRadius: 15,
              marginTop: 0,
            }}>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <Icon name={'sun'} size={20} color="#FFF" />
              <Text style={{ color: 'white', margin: 10 }}>{'Chỉ số UV'}</Text>
              <Text style={{ color: 'white', margin: 10, textAlign: 'right', flex: 1 }}>{`${hourly[0].uv_desc}`}</Text>
            </View>
            <View style={{ backgroundColor: '#FFFFFF', height: 1, width: '100%', paddingHorizontal: 30, margin: 10 }} />

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <Icon name={'eclipse-alt'} size={20} color="#FFF" />
              <Text style={{ color: 'white', margin: 10 }}>{'Bình minh'}</Text>
              <Text style={{ color: 'white', margin: 10, textAlign: 'right', flex: 1 }}>{`${moment(daily[0].sunrise).format(
                'HH:mm',
              )}`}</Text>
            </View>
            <View style={{ backgroundColor: '#FFFFFF', height: 1, width: '100%', paddingHorizontal: 30, margin: 10 }} />

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <Icon name={'cloud-moon'} size={20} color="#FFF" />
              <Text style={{ color: 'white', margin: 10 }}>{'Hoàng hôn'}</Text>
              <Text style={{ color: 'white', margin: 10, textAlign: 'right', flex: 1 }}>{`${moment(daily[0].sunset).format(
                'HH:mm',
              )}`}</Text>
            </View>
            <View style={{ backgroundColor: '#FFFFFF', height: 1, width: '100%', paddingHorizontal: 30, margin: 10 }} />

            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              <Icon name={'humidity'} size={20} color="#FFF" />
              <Text style={{ color: 'white', margin: 10 }}>{'Độ ẩm'}</Text>
              <Text style={{ color: 'white', margin: 10, textAlign: 'right', flex: 1 }}>{`${hourly[0].rh}%`}</Text>
            </View>
          </View>
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Main_Screen;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
