/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Header, Icon} from 'react-native-elements';

import {DANHMUC} from '../../data/DataGiaoThong';
import {ItemBanDo, ItemFilterBanDo} from '../../components/common';

const {width: screenWidth} = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [indexCamera, setIndexCamera] = useState(-1);

  const dataFilter = [
    {
      id: 0,
      icon: 'gas-pump',
      name: 'Trạm xăng',
    },
    {
      id: 1,
      icon: 'parking',
      name: 'Điểm đỗ xe',
    },
    {
      id: 2,
      icon: 'tools',
      name: 'Gara ô tô',
    },
    {
      id: 3,
      icon: 'money-bill',
      name: 'Trạm thu phí',
    },
  ];

  const [region, setRegion] = useState({
    latitude: 20.43423454,
    longitude: 106.17711091,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(DANHMUC);
  }, []);

  useEffect(() => {
    if (indexCamera >= 0) {
      setRegion({
        latitude: entries[indexCamera].latitude,
        longitude: entries[indexCamera].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    return () => {
      setRegion(null);
    };
  }, [entries, indexCamera]);

  const openChiTiet = (item) => {
    console.log('openchitiet');
    console.log(item);
    navigation.navigate('GT_ChiTietDiaDiemScreen', {
      data: item,
    });
  };
  const filterBanDo = (item) => {};

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
          text: 'Bản đồ giao thông',
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
      <View style={{flex: 1}}>
        <MapView
          showsUserLocation={true}
          style={{flex: 1}}
          region={region}
          initialRegion={{
            latitude: 20.43423454,
            longitude: 106.17711091,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {entries.map((i, index) => (
            <Marker
              //draggable
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
              onDragEnd={(e) => console.log(JSON.stringify(e.nativeEvent.coordinate))}
              title={i.title}
              key={`${index}`}
            />
          ))}
        </MapView>
        <View style={{position: 'absolute', top: 0}}>
          <ScrollView horizontal style={{marginBottom: 5, flexDirection: 'row'}} showsHorizontalScrollIndicator={false}>
            {dataFilter.map((item, index) => (
              <ItemFilterBanDo item={item} index={index} onPress={filterBanDo} />
            ))}
          </ScrollView>
        </View>
        <View style={{position: 'absolute', bottom: 50, zIndex: 9999}}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={150}
            //slideStyle={styles.slide}
            itemWidth={screenWidth - 60}
            data={entries}
            renderItem={({item, index}) => <ItemBanDo item={item} index={index} onPress={openChiTiet} />}
            hasParallaxImages={true}
            onSnapToItem={(index) => {
              setIndexCamera(index);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  slide: {width: '100%', height: 150, position: 'absolute', bottom: 3, zIndex: 2},
});
