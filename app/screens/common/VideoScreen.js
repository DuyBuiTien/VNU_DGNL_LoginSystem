/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';

const VideoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {url} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <Video
        source={{uri: url}} // Can be a URL or a local file.
        controls={true}
        style={{flex: 1}}
        full={true}
        paused={false}
        resizeMode={'cover'}
        onError={(err) => console.log(err)}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 38, left: 10, zIndex: 14}}>
        <Icon size={30} name="arrow-back" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
