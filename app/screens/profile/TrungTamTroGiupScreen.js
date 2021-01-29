/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ItemMenu, Header} from '../../components';

const Screen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
      <Header title="Trung tâm trợ giúp" isStack={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Điều khoản & điều kiện'}
          iconLeft="atlas"
          colorIconLeft="#5C7F63"
        />
        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Câu hỏi thường gặp'}
          iconLeft="question"
          colorIconLeft="#5C7F63"
        />
        <ItemMenu
          onPress={() => navigation.navigate('SettingScreen')}
          title={'Câu hỏi thường gặp'}
          iconLeft="headset"
          colorIconLeft="#5C7F63"
        />
      </ScrollView>
    </View>
  );
};

export default Screen;
