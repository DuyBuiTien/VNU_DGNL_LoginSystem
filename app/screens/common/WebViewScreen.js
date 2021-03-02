/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, ActivityIndicator, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header, Icon} from 'react-native-elements';

const Main_Screen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, url, colorHeader, hideBackForward, textColor} = route.params.data;
  const AccessToken = useSelector((state) => state.global.AccessToken);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const webViewRef = useRef();

  const backButtonHandler = () => {
    webViewRef.current && webViewRef.current.goBack();
  };

  const frontButtonHandler = () => {
    webViewRef.current && webViewRef.current.goForward();
  };

  const reloadButtonHandler = () => {
    webViewRef.current && webViewRef.current.reload();
  };

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
      }}>
      <Header
        statusBarProps={{barStyle: 'light-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="light-content" // or directly
        centerComponent={{
          text: title,
          style: {color: textColor ? textColor : '#0A0A0A', fontSize: 20, fontWeight: 'bold'},
        }}
        leftComponent={
          <Icon
            onPress={() => navigation.goBack()}
            name="close"
            color={textColor ? textColor : '#0A0A0A'}
            underlayColor="#00000000"
            containerStyle={{paddingStart: 0}}
          />
        }
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            {!hideBackForward && (
              <Icon
                onPress={() => backButtonHandler()}
                name="arrow-back"
                color={canGoBack ? '#0A0A0A' : '#8F9396'}
                underlayColor="#00000000"
                containerStyle={{paddingStart: 0, marginEnd: 5}}
              />
            )}
            {!hideBackForward && (
              <Icon
                onPress={() => frontButtonHandler()}
                name="arrow-forward"
                color={canGoForward ? (textColor ? textColor : '#0A0A0A') : '#8F9396'}
                underlayColor="#00000000"
                containerStyle={{paddingStart: 0, marginEnd: 5}}
              />
            )}
            <Icon
              onPress={() => reloadButtonHandler()}
              name="sync"
              color={textColor ? textColor : '#0A0A0A'}
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginEnd: 5}}
            />
          </View>
        }
        containerStyle={{
          backgroundColor: colorHeader ? colorHeader : '#FFF',
          justifyContent: 'space-around',
        }}
        centerContainerStyle={{}}
      />

      <WebView
        style={{flex: 1, backgroundColor: 'transparent'}}
        ref={(ref) => (webViewRef.current = ref)}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        originWhitelist={['*']}
        source={{
          uri: url,
        }}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
          setCurrentUrl(navState.url);
        }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />}
      />
    </View>
  );
};

export default Main_Screen;
