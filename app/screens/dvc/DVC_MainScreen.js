/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DANHMUC} from '../../data/DVC_Data';

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Dịch vụ công" isStack={true} />
      <ScrollView>
        {!user && <BlockLogin name="Dịch vụ công" />}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {DANHMUC.map((item) => (
            <ItemMenuImage item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});
