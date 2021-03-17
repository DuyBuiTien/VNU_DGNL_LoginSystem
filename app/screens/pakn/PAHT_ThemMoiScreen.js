/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  Platform,
  TextInput,
  Image,
  Video,
  FlatList,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {showMessage} from 'react-native-flash-message';
import {useNavigation, useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {Button, Avatar, Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import ActionSheet from '../../modules/react-native-actions-sheet';
import {Header} from '../../components';
import {ModelPicker} from '../../components/pakn';
import * as actions from '../../redux/global/Actions';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const ItemLinhVuc = (props) => {
  const {data, key, onPress} = props;
  return (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      data={data?.ThanhPhanHoSo ?? []}
      renderItem={({item, index}) => <RenderItem item={item} index={index} />}
      keyExtractor={(i, index) => index.toString()}
      ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
    />
  );
};

const RenderAsset = (props) => {
  const {image, cleanupSingleImage, key} = props;

  if (image.type && image.type.toLowerCase().indexOf('video/') !== -1) {
    return (
      <View key={key} style={{}}>
        <Video
          source={{uri: image.uri, type: image.mime}}
          resizeMode="cover"
          style={{height: 175, width: 350, margin: 10}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          onError={(e) => console.log(e)}
          onLoad={(load) => console.log(load)}
          repeat={true}
        />
        <FontAwesome
          name="times"
          onPress={() => cleanupSingleImage(image.uri)}
          size={28}
          color="#E53935"
          containerStyle={{position: 'absolute', right: 1, top: 1}}
        />
      </View>
    );
  }

  return (
    <View style={{margin: 10}} key={key}>
      <Image style={{height: 100, width: 100, resizeMode: 'cover', borderRadius: 6}} source={image} />
      <FontAwesome
        name="times"
        onPress={() => cleanupSingleImage(image.uri)}
        size={18}
        color="#f44336"
        style={{position: 'absolute', right: 1, top: 1, backgroundColor: 'transparent', padding: 4}}
      />
    </View>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  let CurrentPosition = useSelector((state) => state.global.CurrentPosition);

  let CurrentLocation = useSelector((state) => state.global.CurrentLocation);

  const [inputValue, setInputValue] = useState('');
  const [linhVuc, setLinhVuc] = useState('');
  const [tieuDe, setTieuDe] = useState('');
  const [moTa, setMoTa] = useState('');
  const [soDT, setSoDT] = useState('');
  const [email, setEmail] = useState('');

  const [images, setimages] = useState([]);

  const [viTri, setViTri] = useState(CurrentLocation);

  const [typeDialog, setTypeDialog] = useState('');

  const [ListLinhVuc, setListLinhVuc] = useState([
    {
      id: 0,
      name: 'Xây dựng',
    },
    {
      id: 1,
      name: 'Môi trường',
    },
    {
      id: 2,
      name: 'An ninh trật tự',
    },
    {
      id: 3,
      name: 'Giao thông',
    },
    {
      id: 4,
      name: 'Phản ánh/góp ý về ứng dụng người dân',
    },
  ]);

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
        dispatch(actions.saveCurrentLocation(position.coords.latitude, position.coords.longitude)).then(() => {
          setViTri(CurrentLocation);
        });
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true},
    );
  };

  const arrayUnique = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].uri === a[j].uri) a.splice(j--, 1);
      }
    }

    return a;
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      includeBase64: true,
    })
      .then((imgs) => {
        var images1 = imgs.map((i) => {
          return {uri: i.path, data: [i.data], type: i.mime};
        });
        var images2 = arrayUnique(images.concat(images1));
        setimages(images2);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        ModalHide();
      });
  };

  const ThemAnh = () => {
    refRBSheet.current.setModalVisible(true);
    setTypeDialog('ThemAnh');
  };

  const ChonLinhVuc = () => {
    refRBSheet.current.setModalVisible(true);
    setTypeDialog('ChonLinhVuc');
  };

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
    setTypeDialog('');
  };

  const handleLinhVuc = (list) => {
    ModalHide();
    let tmpName = [];
    list.map((item) => {
      if (item.checked) {
        tmpName.push(item.name);
      }
    });
    setLinhVuc(tmpName.join(';'));
    setListLinhVuc(list);
  };

  useEffect(() => {
    getLocation();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Gửi phản ánh" isStack={true} />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          tabLabel="Đang xử lý"
          style={{backgroundColor: 'transparent', flex: 1}}>
          <View style={styles.content1}>
            <Text style={styles.title}>Hình ảnh</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 100,
                  height: 100,
                  borderRadius: 6,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  marginTop: 10,
                }}
                onPress={() => {
                  ThemAnh();
                }}>
                <FontAwesome name="plus" size={35} color="#F1462E" />
                <Text style={{color: '#B0B0B0', fontSize: 12}}>Thêm ảnh</Text>
              </TouchableOpacity>
              {images && images.map((i) => <RenderAsset image={i} key={i.uri} />)}
            </ScrollView>
          </View>

          <View
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              backgroundColor: '#F4E7D5',
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <View style={{marginHorizontal: 10}}>
              <Text style={{color: '#5B6062'}}>Tên người đăng tin</Text>
              <Text style={styles.title}>Nguyễn Tùng Lâm</Text>
            </View>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Lĩnh vực:</Text>
            <TouchableOpacity
              onPress={ChonLinhVuc}
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <Text style={{color: 'gray'}} numberOfLines={2}>
                {linhVuc !== '' ? linhVuc : 'Chọn lĩnh vực'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'gray'} />
            </TouchableOpacity>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Tiêu đề:</Text>
            <View
              onPress={() => {}}
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập tiêu đề'}
                onChangeText={(text) => setTieuDe(text)}
                value={tieuDe}
                multiline={true}
                selectionColor={'gray'}
                style={{flex: 1}}
                clearButtonMode="always"
              />
            </View>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Mô tả:</Text>
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập mô tả'}
                onChangeText={(text) => setMoTa(text)}
                value={moTa}
                multiline={true}
                selectionColor={'gray'}
                style={{flex: 1, height: 100}}
                clearButtonMode="always"
              />
            </View>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Số điện thoại:</Text>
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập số điện thoại'}
                onChangeText={(text) => setSoDT(text)}
                value={soDT}
                multiline={false}
                selectionColor={'gray'}
                style={{flex: 1}}
                clearButtonMode="always"
              />
            </View>
          </View>
          <View style={{marginHorizontal: 15, marginTop: 5}}>
            <Text style={{color: '#5B6062', fontSize: 12, fontWeight: '200', flex: 1}}>
              {'Bạn cần cung cấp đúng số điện thoại để đơn vị xử lý xác thực nội dung phản ánh'}
            </Text>
          </View>

          <View style={styles.content1}>
            <Text style={styles.title}>Email:</Text>
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={'Nhập email'}
                onChangeText={(text) => setEmail(text)}
                value={email}
                multiline={false}
                selectionColor={'gray'}
                style={{flex: 1}}
                clearButtonMode="always"
              />
            </View>
          </View>

          <View style={styles.content1}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.title}>Vị trí phản ánh:</Text>
              <TouchableOpacity
                onPress={() => {
                  getLocation();
                }}>
                <Text style={{color: '#4C9EE5', fontWeight: '600'}}>Vị trí của tôi</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <View
                style={{
                  padding: 10,
                  borderColor: '#D1D1D1',
                  borderWidth: 0.5,
                  borderRadius: 8,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  minHeight: 40,
                  alignItems: 'center',
                  flex: 1,
                }}>
                <TextInput
                  placeholder={'Nhập vị trí'}
                  onChangeText={(text) => setViTri(text)}
                  value={viTri}
                  multiline={true}
                  selectionColor={'gray'}
                  style={{flex: 1}}
                  clearButtonMode="always"
                />
              </View>
              <Button
                title="Vị trí khác"
                titleStyle={{fontSize: 14, color: '#fff', fontWeight: '600'}}
                containerStyle={{marginStart: 10}}
                buttonStyle={{borderRadius: 4, backgroundColor: '#EF6C00', paddingVertical: 10}}
                onPress={() => {
                  getLocation();
                }}
              />
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{color: '#5B6062', fontSize: 12, fontWeight: '200', flex: 1}}>
                {`Vĩ độ: ${CurrentPosition.latitude}, kinh độ ${CurrentPosition.longitude}`}
              </Text>
            </View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{height: 200, marginTop: 10, marginBottom: 10}}
              region={{
                latitude: parseFloat(CurrentPosition.latitude),
                longitude: parseFloat(CurrentPosition.longitude),
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
              showsUserLocation={true}>
              <MapView.Marker
                coordinate={{latitude: parseFloat(CurrentPosition.latitude), longitude: parseFloat(CurrentPosition.longitude)}}
                draggable
              />
            </MapView>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          title="Đăng tin phản ánh"
          titleStyle={{fontSize: 15, color: '#fff', fontWeight: '600'}}
          containerStyle={{marginVertical: 10, marginHorizontal: 50}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
          onPress={() => {
            navigation.navigate('PAHT_ThemMoiScreen');
          }}
        />
      </View>

      <ActionSheet
        // initialOffsetFromBottom={0.5}

        ref={refRBSheet}
        bounceOnOpen={true}
        bounciness={8}
        gestureEnabled={true}
        onClose={() => {
          //setTypeBottomSheet(0);
        }}
        containerStyle={{margin: 20}}
        defaultOverlayOpacity={0.3}>
        <ScrollView style={{padding: 15, marginBottom: 20, maxHeight: SCREEN_HEIGHT / 2}}>
          {typeDialog === 'ThemAnh' ? (
            <>
              <TouchableOpacity
                style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}
                onPress={() => {
                  pickMultiple();
                }}>
                <FontAwesome name="images" size={20} color="#EF6C00" />
                <Text style={{fontWeight: 'bold', marginStart: 15, color: '#5B6062'}}>Chọn từ thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <FontAwesome name="camera" size={20} color="#EF6C00" />
                <Text style={{fontWeight: 'bold', marginStart: 15, color: '#5B6062'}}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <FontAwesome name="video" size={20} color="#EF6C00" />
                <Text style={{fontWeight: 'bold', marginStart: 15, color: '#5B6062'}}>Quay video</Text>
              </TouchableOpacity>
            </>
          ) : typeDialog === 'ChonLinhVuc' ? (
            <ModelPicker
              isMultiChoice={false}
              handleDongY={handleLinhVuc}
              listdata={ListLinhVuc}
              handleModal={ModalHide}
              title={'Chọn lĩnh vực'}
              height={SCREEN_HEIGHT / 2}
            />
          ) : (
            <></>
          )}
        </ScrollView>
      </ActionSheet>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  content1: {marginHorizontal: 15, marginTop: 20},
  title: {color: '#5B6062', fontWeight: '600'},
});
