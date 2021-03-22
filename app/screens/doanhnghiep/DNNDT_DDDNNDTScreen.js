/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';
import {DDDNNDT_DANHMUC} from '../../data/DNNDT_Data';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Diễn đàn doanh nghiệp/nhà đầu tư" isStack={true} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {DDDNNDT_DANHMUC.map((item) => (
            <ItemMenuImage item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
