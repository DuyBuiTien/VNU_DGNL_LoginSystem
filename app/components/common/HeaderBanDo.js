/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Icon} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const HeaderBanDo = (props) => {
  const {navigation, title} = props;
  return (
    <Header
      statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
      barStyle="dark-content"
      placement="left"
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name={'arrow-back'}
            color="#2E2E2E"
            underlayColor="#00000000"
            containerStyle={{paddingStart: 0, marginHorizontal: 10}}
          />
        </TouchableOpacity>
      }
      centerComponent={{
        text: title,
        style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
      }}
      rightComponent={
        <View style={{flexDirection: 'row'}}>
          <FontAwesome name={'search'} color="#2E2E2E" containerStyle={{paddingStart: 0}} onPress={() => {}} size={20} />
          <FontAwesome
            style={{marginStart: 10}}
            name={true ? 'map-marked-alt' : 'list'}
            color="#2E2E2E"
            containerStyle={{paddingStart: 0}}
            onPress={() => {}}
            size={20}
          />
        </View>
      }
      containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
      centerContainerStyle={{justifyContent: 'center'}}
    />
  );
};

export default HeaderBanDo;

const styles = StyleSheet.create({});
