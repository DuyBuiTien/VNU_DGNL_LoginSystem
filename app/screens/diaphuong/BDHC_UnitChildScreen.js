/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Animated,
  Image,
} from 'react-native';
import {Text, Button, Icon} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';

import {QLDB_URL, HOST_YT} from '../../config/server';
import {areaCode} from '../../config/province';
import {requestGET} from '../../services/Api';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const BDHC_UnitChildScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollY = useRef(new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0)).current;

  const [loading, setLoading] = useState(true);
  const [dataChild, setdataChild] = useState([]);
  const [dataAnh, setdataAnh] = useState([]);
  const [dataUrl, setdataUrl] = useState([]);

  const dataInfo = route.params?.data ?? null;

  useEffect(() => {
    const fetchData = async () => {
      var data2 = await requestGET(`${QLDB_URL}/DiaBanApi/mGetChildByCode?AreaCode=${areaCode}`);

      var dataChild_ = data2.data ? data2.data : [];
      var data1 = dataInfo.UrlAnhLienQuan ? dataInfo.UrlAnhLienQuan.split('\n') : [];
      var dataAnh_ = [];
      var dataUrl_ = [];
      data1.map((i) => {
        var url = i.split(',')[0];
        dataAnh_.push(url);
        dataUrl_.push({url: `${HOST_YT}${url}`});
      });

      setdataAnh(dataAnh_);
      setdataUrl(dataUrl_);
      setdataChild(dataChild_);
      setLoading(false);
    };
    fetchData();
    return () => {
      setdataAnh([]);
      setdataUrl([]);
      setdataChild([]);
      setLoading(true);
    };
  }, [dataInfo.UrlAnhLienQuan]);

  const _renderScrollViewContent = (dataInfo_, dataChild_) => {
    var dt = dataInfo_.TuNhien_DiaHinh_DienTich ? `${dataInfo_.TuNhien_DiaHinh_DienTich}` : 'Không có số liệu';
    var ds = dataInfo_.TongQuan_DanSo_Tong ? `${dataInfo_.TongQuan_DanSo_Tong}` : 'Không có số liệu';
    var top = Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0;
    return (
      <View style={{padding: 15, paddingTop: top}}>
        <Text style={{color: '#FF9800'}} />
        <Text style={{fontSize: 40, padding: 5, paddingLeft: 0}}>{dataInfo_.AreaName}</Text>
        <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
          <View style={styles.view2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon type="font-awesome" name="map" size={18} color="#FF9800" />
              <Text style={{color: '#757575', paddingTop: 5}}> Diện tích</Text>
            </View>
            <Text style={{fontWeight: 'bold', paddingTop: 10}}>{dt}</Text>
          </View>
          <View style={styles.view2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon type="font-awesome" name="user" size={18} color="#FF9800" />
              <Text style={{color: '#757575', paddingTop: 5}}> Dân số</Text>
            </View>
            <Text style={{fontWeight: 'bold', paddingTop: 10}}>{ds}</Text>
          </View>
        </View>
        <Text style={{lineHeight: 30}}>{dataInfo_.TongQuan_GioiThieu}</Text>
        <Text
          style={{
            fontSize: 18,
            paddingTop: 30,
            paddingBottom: 10,
            fontWeight: '600',
          }}>
          Ảnh
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GalleryScreen', {
              images: dataUrl,
              title: dataInfo.AreaName,
            })
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            backgroundColor: '#fff',
            padding: 10,
          }}>
          {dataAnh.map((item) => (
            <Image
              resizeMethod="resize"
              style={styles.renderImage}
              source={{uri: `${HOST_YT}${item}`}}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </TouchableOpacity>
        {dataChild.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: 18,
                paddingTop: 30,
                paddingBottom: 10,
                fontWeight: '600',
              }}>
              Thuộc {dataInfo.AreaName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
              }}>
              {dataChild.map((item) => {
                var urlAnh = item.UrlAnhDaiDien
                  ? `${HOST_YT}${item.UrlAnhDaiDien.split(',')[0]}`
                  : 'https://vneconomy.mediacdn.vn/zoom/480_270/2019/3/29/tp-hcm-155384260439116565666-crop-1553842610657853611450.jpg';
                return (
                  <TouchableOpacity
                    key={item.ID}
                    onPress={() =>
                      navigation.navigate('BDHC_UnitChild2Screen', {
                        data: item,
                      })
                    }
                    style={{justifyContent: 'center', padding: 5}}>
                    <ImageBackground
                      source={{uri: urlAnh}}
                      style={{
                        height: 80,
                        width: 100,
                        overflow: 'hidden',
                        borderTopLeftRadius: 10,
                        borderBottomRightRadius: 20,
                      }}
                    />
                    <Text
                      style={{
                        paddingTop: 10,
                        fontWeight: '600',
                        width: 100,
                        height: 50,
                      }}>
                      {item.AreaName}
                    </Text>
                    <Text
                      style={{
                        paddingTop: 5,
                        color: '#757575',
                        paddingBottom: 10,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  var urlAnh1 = dataInfo.UrlAnhDaiDien
    ? `${HOST_YT}${dataInfo.UrlAnhDaiDien.split(',')[0]}`
    : 'https://vneconomy.mediacdn.vn/zoom/480_270/2019/3/29/tp-hcm-155384260439116565666-crop-1553842610657853611450.jpg';

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" style={{}} color="#2AA5FF" />
          <Text style={{textAlign: 'center', paddingTop: 10, color: '#2AA5FF'}}>Đang lấy dữ liệu</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Animated.ScrollView
            style={styles.fill}
            scrollEventThrottle={1}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
            contentInset={{
              top: HEADER_MAX_HEIGHT,
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT,
            }}>
            {_renderScrollViewContent(dataInfo, dataChild)}
          </Animated.ScrollView>
          <Animated.View pointerEvents="none" style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{translateY: imageTranslate}],
                },
              ]}
              source={{uri: urlAnh1}}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.bar,
              {
                transform: [{scale: titleScale}, {translateY: titleTranslate}],
              },
            ]}>
            <Icon onPress={() => navigation.goBack()} name="arrow-back" color="#353D41" size={30} />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default BDHC_UnitChildScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  view1: {
    backgroundColor: '#fff',
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
    shadowOpacity: 1.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 5,
    marginTop: -20,
    height: 40,
    elevation: 8,
  },
  view2: {
    backgroundColor: '#fff',
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1 / 2,
    margin: 5,
    padding: 20,
  },
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    position: 'absolute',
    top: 0,
    left: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderImage: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
    aspectRatio: 1,
    margin: 10,
  },
});
