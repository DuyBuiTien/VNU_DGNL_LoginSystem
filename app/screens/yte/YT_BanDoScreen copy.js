/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, Text, View, ScrollView, Linking, Dimensions, Platform, PermissionsAndroid} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {TouchableOpacity, RectButton} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Header, Icon} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import {showMessage} from 'react-native-flash-message';

import * as actions from '../../redux/global/Actions';
import {DANHMUC} from '../../data/DataYTe';
import {ItemBanDo, ItemFilterBanDo} from '../../components/common';

const {width: screenWidth} = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.global.user);
  let CurrentPosition = useSelector((state) => state.global.CurrentPosition);

  const [indexCamera, setIndexCamera] = useState(-1);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng cấp quyền cho ứng dụng sử dụng vị trí hiện tại của bạn',
        type: 'danger',
        duration: 5000,
      });
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng cấp quyền cho ứng dụng sử dụng vị trí hiện tại của bạn',
        type: 'danger',
        duration: 5000,
      });
    }
    return false;
  };

  const getLocation = async () => {
    const hasLocationPermission_ = await hasLocationPermission();

    if (!hasLocationPermission_) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng cấp quyền cho ứng dụng sử dụng vị trí hiện tại của bạn',
        type: 'danger',
        duration: 5000,
      });
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(actions.saveCurrentPosition({latitude: position.coords.latitude, longitude: position.coords.longitude}));
        dispatch(actions.saveCurrentLocation(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true},
    );
  };

  useEffect(() => {
    getLocation();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFilter = [
    {
      id: 0,
      icon: 'hospital-alt',
      name: 'Bệnh viện',
      type: 'benhvien',
    },
    {
      id: 1,
      icon: 'capsules',
      name: 'Nhà thuốc',
      type: 'nhathuoc',
    },
    {
      id: 2,
      icon: 'first-aid',
      name: 'Phòng khám',
      type: 'phongkham',
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
          text: 'Bản đồ y tế',
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
          //zoomEnabled={false}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{flex: 1}}
          region={region}
          initialRegion={{
            latitude: parseFloat(CurrentPosition.latitude),
            longitude: parseFloat(CurrentPosition.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          {entries.map((i, index) => (
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
                openChiTiet(i);
              }}
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
            latitude: parseFloat(CurrentPosition.latitude),
            longitude: parseFloat(CurrentPosition.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}>
        <FontAwesome name={'map-marker-alt'} color={'#03a9f4'} size={18} />
      </RectButton>
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
