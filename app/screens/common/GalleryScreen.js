/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useNavigation, useRoute} from '@react-navigation/native';

const GalleryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const images = route.params?.images ?? [];
  const title = route.params?.title ?? [];

  const [index, setIndex] = useState(0);

  images;
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <ImageViewer
        renderHeader={() => (
          <View style={{position: 'absolute', top: 38, left: 10, zIndex: 14}}>
            <Icon size={30} name="arrow-back" color="white" onPress={() => navigation.goBack()} />
          </View>
        )}
        imageUrls={images}
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({});
