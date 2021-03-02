/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';

import {Header} from '../../components';

const DVC_TKHS_SearchScreen = () => {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');

  const barcodeReceived = (e) => {
    if (e.data) {
      navigation.navigate('DVC_TKHS_SearchScreen', {code: e.data});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Quét mã hồ sơ" isStack={true} />
      <RNCamera
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        defaultTouchToFocus
        mirrorImage={false}
        barcodeFinderVisible={true}
        barcodeFinderWidth={280}
        barcodeFinderHeight={220}
        barcodeFinderBorderColor="red"
        barcodeFinderBorderWidth={2}
        onBarCodeRead={barcodeReceived}
        captureAudio={false}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          <View
            style={{
              height: 250,
              width: 250,
              borderWidth: 2,
              borderColor: '#00FF00',
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </RNCamera>
    </View>
  );
};

export default DVC_TKHS_SearchScreen;

const styles = StyleSheet.create({});
