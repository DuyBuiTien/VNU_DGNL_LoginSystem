/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import images from '../../themes/Images';

const AQI = (props) => {
  const {aqi} = props;

  let item = {
    aqi: aqi,
    image: images.background.faceyellow,
    bgColor: '#ffdf58',
    txtColor: '#a57f23',
  };

  if (aqi > 200) {
    item = {
      aqi: aqi,
      image: images.background.facepurple,
      bgColor: '#b283c5',
      bgColor2: '#a97abc',
      txtColor: '#634675',
    };
  } else if (aqi > 99 && aqi < 201) {
    item = {
      aqi: aqi,
      image: images.background.facered,
      bgColor: '#ff7978',
      bgColor2: '#fe6a69',
      txtColor: '#af2c3b',
    };
  } else {
    item = {
      aqi: aqi,
      image: images.background.faceyellow,
      bgColor: '#ffdf58',
      bgColor2: '#fdd74b',
      txtColor: '#a57f23',
    };
  }

  return (
    <View style={[styles.container, {backgroundColor: item.bgColor}]}>
      <View style={{padding: 10, backgroundColor: item.bgColor2, borderRadius: 10}}>
        <Image resizeMode="cover" style={{width: 40, height: 40}} source={item.image} />
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: item.txtColor, fontSize: 14, fontWeight: 'bold', padding: 5}}>{item.aqi}</Text>
        <Text style={{fontSize: 10, textAlign: 'center'}}>AQI</Text>
      </View>
    </View>
  );
};

export default AQI;

const styles = StyleSheet.create({
  container: {alignItems: 'center', flexDirection: 'row', borderRadius: 10},
});
