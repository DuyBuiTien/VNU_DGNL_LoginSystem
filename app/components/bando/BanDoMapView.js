/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';

import {StyleSheet, Text, View, ScrollView, Linking, Dimensions, Platform, PermissionsAndroid} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {TouchableOpacity, RectButton} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import ItemBanDo from './ItemBanDo';

const {width: screenWidth} = Dimensions.get('window');

const BanDoComponent = (props) => {
  const carouselRef = useRef(null);
  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  const {dataBanDo, onPressMarker, setIndexCarousel, initLatitude, initLongitude, region, setRegion} = props;
  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          //zoomEnabled={false}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{flex: 1}}
          region={region}
          initialRegion={{
            latitude: parseFloat(initLatitude),
            longitude: parseFloat(initLongitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {dataBanDo.map((i, index) => (
            <Marker
              //draggable
              //onDragEnd={(e) => console.log(JSON.stringify(e.nativeEvent.coordinate))}
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
              title={i.title}
              //image={i.icon}
              key={`${index}`}
              onPress={() => {
                onPressMarker(i);
              }}
            />
          ))}
        </MapView>

        <View style={{position: 'absolute', bottom: 20, zIndex: 9999}}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={150}
            itemWidth={300}
            data={dataBanDo}
            renderItem={({item, index}) => <ItemBanDo item={item} index={index} onPress={onPressMarker} />}
            hasParallaxImages={true}
            onSnapToItem={(index) => {
              setIndexCarousel(index);
            }}
          />
        </View>
      </View>

      <RectButton
        style={{
          width: 45,
          height: 45,
          position: 'absolute',
          bottom: 200,
          right: 0,
          zIndex: 9999,
          marginRight: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFF',
          borderRadius: 1000,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          marginHorizontal: 20,
          borderColor: '#abb4bd65',

          shadowRadius: 2,
          elevation: 2,
        }}
        onPress={() => {
          setRegion({
            latitude: parseFloat(initLatitude),
            longitude: parseFloat(initLongitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}>
        <FontAwesome name={'map-marker-alt'} color={'#03a9f4'} size={18} />
      </RectButton>
    </>
  );
};

export default BanDoComponent;

const styles = StyleSheet.create({});
