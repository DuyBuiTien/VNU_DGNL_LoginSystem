/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

export const AuthContext = React.createContext();

import * as actions from '../redux/global/Actions';
import AppStack from './AppStack';
import {IntroScreen} from '../screens/intro';

const RootContainerScreen = () => {
  const dispatch = useDispatch();
  const isLoadIntro = useSelector((state) => state.global.isLoadIntro);
  let user = useSelector((state) => state.global.user);
  let username = user?.username ?? null;

  const [netStatus, setNet] = useState(true);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNet(state.isConnected);
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  useEffect(() => {
    checkApplicationPermission();
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          dispatch(actions.setTokenFirebase(fcmToken));

          messaging().subscribeToTopic('tdsmartcity');

          if (username) {
            messaging().subscribeToTopic(username.toLowerCase());
          }
        } else {
          console.log("user doesn't have a device token yet");
        }
      });

    return () => {};
  }, [dispatch, username]);

  if (!netStatus) {
    showMessage({
      message: 'Lỗi mạng',
      description: 'Vui lòng kiểm tra kết nối mạng',
      type: 'danger',
      duration: 5000,
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        {!isLoadIntro ? (
          <Stack.Screen
            name="IntroScreen"
            component={IntroScreen}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootContainerScreen;

const styles = StyleSheet.create({});
