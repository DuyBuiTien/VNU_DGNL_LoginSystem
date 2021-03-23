/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, Text, View, ScrollView, Linking, Dimensions, Platform, PermissionsAndroid, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {TouchableOpacity, RectButton} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';

import * as actions from '../../redux/global/Actions';
import {ItemFilterBanDo, HeaderBanDo} from '../../components/common';
import {BanDoMapView, ItemBanDo, RenderLocBanDo} from '../../components/bando';
import ActionSheet from '../../modules/react-native-actions-sheet';

const {width: screenWidth} = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const data = route.params?.data ?? null;
  const refRBSheet = useRef();

  const TitleBanDo = route.params?.title ?? 'Bản đồ';

  //const {dataFilter} = data;
  const [typeView, setTypeView] = useState(true);

  const [dataFilter, setDataFilter] = useState(data.dataFilter);
  /*  useEffect(() => {
    let tmp = [];
    data.dataFilter.map((i) => {
      let item = {...i};
      item.checked = true;
      tmp.push(i);
    });
    console.log(tmp);
    console.log('aaaa');
    setDataFilter(tmp);
    return () => {};
  }, [data.dataFilter]); */

  const [category, setCategory] = useState('z');

  useEffect(() => {
    let categorytmp = '';
    dataFilter.map((i) => {
      if (!i.checked) {
        categorytmp += i.name + '|';
      }
    });
    if (categorytmp.length > 1) {
      setCategory(categorytmp);
    }
    return () => {};
  }, [dataFilter]);

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

  const [region, setRegion] = useState({
    latitude: parseFloat(CurrentPosition.latitude),
    longitude: parseFloat(CurrentPosition.longitude),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    const fetchData = async () => {
      var config = {
        method: 'get',
        url: `https://api-smartapp.namdinh.gov.vn/api/articles/search?latitude=${CurrentPosition.latitude}&longitude=${CurrentPosition.longitude}&range=10.0&categories=${category}`,
        headers: {
          CLIENTAPIKEY: '5ce554c2-1332-481e-97c2-5856d9612433',
        },
      };
      let response = await axios(config);
      if (response.data && response.data.results && response.data.results.data) {
        setEntries(response.data.results.data);
      }
    };

    if (category.length > 3) {
      fetchData();
    }
    return () => {
      setEntries([]);
    };
  }, [CurrentPosition.latitude, CurrentPosition.longitude, category]);

  useEffect(() => {
    if (indexCamera >= 0) {
      try {
        setRegion({
          latitude: entries[indexCamera].latitude,
          longitude: entries[indexCamera].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {}
    }
    return () => {
      setRegion(null);
    };
  }, [entries, indexCamera]);

  const openChiTiet = (item) => {
    navigation.navigate('ChiTietDiaDiemScreen', {
      data: item,
    });
  };
  const filterBanDo = (item) => {
    console.log(item);
    refRBSheet.current.setModalVisible(true);
  };

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
  };

  const handleDongY = (listChoice) => {
    //console.log(listChoice);
    setDataFilter(listChoice);
    refRBSheet.current.setModalVisible(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderBanDo title={TitleBanDo} navigation={navigation} typeView={typeView} setTypeView={setTypeView} />
      <View /* style={{position: 'absolute', top: 60}} */>
        <ScrollView horizontal style={{marginBottom: 5, flexDirection: 'row'}} showsHorizontalScrollIndicator={false}>
          <ItemFilterBanDo
            item={{
              id: 999,
              icon: 'filter',
              name: 'Bộ lọc',
            }}
            index={99}
            onPress={() => {
              refRBSheet.current.setModalVisible(true);
            }}
          />

          {dataFilter.map((item, index) => {
            if (!item.checked) return <ItemFilterBanDo item={item} index={index} onPress={filterBanDo} />;
          })}
        </ScrollView>
      </View>
      {typeView ? (
        <BanDoMapView
          dataBanDo={entries}
          onPressMarker={openChiTiet}
          setIndexCarousel={setIndexCamera}
          initLatitude={CurrentPosition.latitude}
          initLongitude={CurrentPosition.longitude}
          region={region}
          setRegion={setRegion}
        />
      ) : (
        <FlatList
          data={entries}
          renderItem={({item, index}) => <ItemBanDo item={item} index={index} onPress={openChiTiet} isList={true} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <ActionSheet
        // initialOffsetFromBottom={0.5}
        initialOffsetFromBottom={1}
        ref={refRBSheet}
        bounceOnOpen={true}
        bounciness={8}
        gestureEnabled={true}
        onClose={() => {
          //setTypeBottomSheet(0);
        }}
        containerStyle={{margin: 20}}
        defaultOverlayOpacity={0.3}>
        <RenderLocBanDo
          data={dataFilter}
          handleDongY={handleDongY}
          actionSheetRef={refRBSheet}
          ModalHide={ModalHide}
          isMultiChoice={true}
          title="Bộ lọc"
        />
      </ActionSheet>
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
