/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();

import {HomeScreen} from '../screens/home';
import {DiaPhuongScreen} from '../screens/diaphuong';
import {NotificationScreen} from '../screens/notification';
import {ProfileScreen} from '../screens/profile';

const AppBottomTab = () => {
  const dataApp = useSelector((state) => state.global.dataApp);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        showLabel: true,
        inactiveBackgroundColor: '#FFFFFF',
        activeBackgroundColor: '#FFFFFF',
        activeTintColor: '#D6002C',
        inactiveTintColor: '#757E83',
        labelStyle: {
          fontSize: 10,
          fontWeight: '400',
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
        style: {paddingHorizontal: isTablet ? 100 : 0, backgroundColor: '#FFFFFF'},
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="home"
                size={isTablet ? 24 : 22}
                color={focused ? '#D6002C' : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="DiaPhuongScreen"
        component={DiaPhuongScreen}
        options={{
          tabBarLabel: dataApp?.name ?? 'Địa phương',
          tabBarBadge: null,
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="map-marked-alt"
                size={isTablet ? 24 : 22}
                color={focused ? '#D6002C' : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarBadge: null,
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="bell"
                size={isTablet ? 24 : 22}
                color={focused ? '#D6002C' : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon name="user" size={isTablet ? 24 : 22} color={focused ? '#D6002C' : '#757E83'} solid={focused ? true : false} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTab;
