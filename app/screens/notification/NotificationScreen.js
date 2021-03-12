/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VersionCheck from 'react-native-version-check';

import {ItemMenu, Header} from '../../components';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F1F1F1'}}>
      <Header title="Thông báo" leftComponent={false} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
