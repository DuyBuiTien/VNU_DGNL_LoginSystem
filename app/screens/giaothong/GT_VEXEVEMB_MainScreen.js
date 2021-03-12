/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';

import {ItemMenuImage, BlockLogin} from '../../components/common';

import {Header} from '../../components';
import {DANHMUC} from '../../data/GT_VeXe_Data';



const GT_VEXEVEMB_MainScreen = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Giao thông" isStack={true} />
      <ScrollView>
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

export default GT_VEXEVEMB_MainScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: 'black',
  },
  description: {
    flex: 1,
  },
  linearGradient1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#0271FE',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    padding: 10,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    marginHorizontal: 20,
  },
});
