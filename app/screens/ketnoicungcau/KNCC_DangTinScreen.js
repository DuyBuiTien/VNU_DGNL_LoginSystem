/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Video, FlatList, KeyboardAvoidingView, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { RectButton } from 'react-native-gesture-handler';
import { ItemTextInput, ItemDateInput } from '../../components/common';
import RadioForm from '../../modules/react-native-simple-radio-button';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from '../../modules/react-native-actions-sheet';
import { Button } from 'react-native-elements';

import { Header } from '../../components';
import { SearchComponent } from '../../components/common';
import { ItemSanPhamHorizontal } from '../../components/ketnoicungcau';
import { CB_Data } from '../../data/TMDT_Data';
import { requestGET, requestPOST_CC } from '../../services/Api';
import { BlockLogin } from '../../components/common';
import { RenderChonDonVi, RenderChonMucDo, RenderChonLinhVuc } from '../../components/dvc';
import { showMessage } from 'react-native-flash-message';

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RenderAsset = (props) => {
  const { image, cleanupSingleImage, key, images, setimages } = props;

  return (
    <View style={{ margin: 10 }} key={key}>
      <Image style={{ height: 100, width: 100, resizeMode: 'cover', borderRadius: 6 }} source={image} />
      <FontAwesome
        name="times"
        onPress={() =>
          setimages(images.filter(function (item) {
            return item.uri !== image.uri
          }))}
        size={18}
        color="#f44336"
        style={{ position: 'absolute', right: 1, top: 1, backgroundColor: 'transparent', padding: 4 }}
      />
    </View>
  );
};

const KNCC_CB_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const AccessToken = useSelector((state) => state.global.AccessToken);

  const [dataLoai, setDataLoai] = useState([
    {
      label: 'Cần mua',
      value: 1,
    },
    {
      label: 'Cần bán',
      value: 2,
    },
    {
      label: 'Tìm đối tác',
      value: 3,
    },
  ]);

  const refRBSheet = useRef();

  const [loadingButton, setLoadingButton] = useState(false);

  const [type, setType] = useState(1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [images, setimages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [typeDialog, setTypeDialog] = useState('');

  const [danhmucsp, setDanhmucsp] = useState({ code: '', name: '' });
  const [dataDanhmuc, setDataDanhmuc] = useState([]);

  const [loaisp, setLoaisp] = useState({ code: '', name: '' });
  const [dataLoaisp, setDataLoaisp] = useState([]);

  const [quocgia, setQuocgia] = useState({ code: '', name: '' });
  const [dataquocgia, setDataQuocgia] = useState([]);

  const [tinh, setTinh] = useState({ code: '', name: '' });
  const [dataTinh, setDataTinh] = useState([]);

  const [huyen, setHuyen] = useState({ code: '', name: '' });
  const [dataHuyen, setDataHuyen] = useState([]);

  const [xa, setXa] = useState({ code: '', name: '' });
  const [dataXa, setDataXa] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    var data1 = await requestGET(`${dataService.KNCC_URL}/category`)
    var data2 = data1 ? data1 : []
    data2.map((i) => i.code = i.id)
    setDataDanhmuc(data2)
    var data1 = await requestGET(`${dataService.KNCC_URL}/country`)
    var data2 = data1.data ? data1.data : []
    var data3 = []
    data2.map((i) => data3.push({ code: i.Id, name: i.Name }))
    setDataQuocgia(data3)
    setIsLoading(false);
  };

  const fetchDataLoai = async () => {
    var data1 = await requestGET(`${dataService.KNCC_URL}/subcategory?CategoryId=${danhmucsp.code}`)
    var data2 = data1 ? data1 : []
    var data3 = []
    data2.map((i) => data3.push({ code: i.Id, name: i.Title }))
    setDataLoaisp(data3)
  };

  const fetchDataTinh = async () => {
    var data1 = await requestGET(`${dataService.KNCC_URL}/province/getByCountry/${quocgia.code}`)
    var data2 = data1 ? data1 : []
    var data3 = []
    data2.map((i) => data3.push({ code: i.Id, name: i.Name }))
    setDataTinh(data3)
  };

  const fetchDataHuyen = async () => {
    var data1 = await requestGET(`${dataService.KNCC_URL}/district/getByProvince/${tinh.code}`)
    var data2 = data1 ? data1 : []
    var data3 = []
    data2.map((i) => data3.push({ code: i.Id, name: i.Name }))
    setDataHuyen(data3)
  };

  const fetchDataXa = async () => {
    var data1 = await requestGET(`${dataService.KNCC_URL}/commune/getByDistrict/${huyen.code}`)
    var data2 = data1 ? data1 : []
    var data3 = []
    data2.map((i) => data3.push({ code: i.Id, name: i.Name }))
    setDataXa(data3)
  };

  useEffect(() => {
    fetchData()
    return () => { };
  }, []);

  useEffect(() => {
    if (danhmucsp.code) {
      fetchDataLoai()
    }
    return () => { };
  }, [danhmucsp]);

  useEffect(() => {
    if (quocgia.code) {
      fetchDataTinh()
    }
    return () => { };
  }, [quocgia]);

  useEffect(() => {
    if (tinh.code) {
      fetchDataHuyen()
    }
    return () => { };
  }, [tinh]);

  useEffect(() => {
    if (huyen.code) {
      fetchDataXa()
    }
    return () => { };
  }, [huyen]);

  const chonDanhmucsp = () => {
    setTypeDialog('Danhmucsp')
    refRBSheet.current.setModalVisible(true);
  };

  const chonLoaisp = () => {
    if (danhmucsp.code) {
      setTypeDialog('Loaisp')
      refRBSheet.current.setModalVisible(true);
    }
    else {
      showMessage('Vui lòng chọn danh mục sản phẩm')
    }
  };

  const chonQuocgia = () => {
    setTypeDialog('Quocgia')
    refRBSheet.current.setModalVisible(true);
  };

  const chonTinh = () => {
    if (quocgia.code) {
      setTypeDialog('Tinh')
      refRBSheet.current.setModalVisible(true);
    }
    else {
      showMessage('Vui lòng chọn quốc gia')
    }
  };

  const chonHuyen = () => {
    if (tinh.code) {
      setTypeDialog('Huyen')
      refRBSheet.current.setModalVisible(true);
    }
    else {
      showMessage('Vui lòng chọn tỉnh/thành phố')
    }
  };

  const chonXa = () => {
    if (tinh.code) {
      setTypeDialog('Xa')
      refRBSheet.current.setModalVisible(true);
    }
    else {
      showMessage('Vui lòng chọn quận huyện')
    }
  };

  const handleDanhmucsp = (item) => {
    ModalHide();
    setDanhmucsp(item);
  };

  const handleLoaisp = (item) => {
    ModalHide();
    setLoaisp(item);
  };

  const handleQuocgia = (item) => {
    ModalHide();
    setQuocgia(item);
  };

  const handleTinh = (item) => {
    ModalHide();
    setTinh(item);
  };

  const handleHuyen = (item) => {
    ModalHide();
    setHuyen(item);
  };

  const handleXa = (item) => {
    ModalHide();
    setXa(item);
  };

  const ThemAnh = () => {
    setTypeDialog('ThemAnh');
    refRBSheet.current.setModalVisible(true);
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    })
      .then((i) => {
        var images1 = { uri: i.path, type: i.mime }
        var images2 = arrayUnique(images.concat(images1));
        setimages(images2);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        ModalHide()
      });
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

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
    setTypeDialog('');
  };

  const checkContetn = () => {
    if (!type|| !title || !content || !address || !phone || !fromDate || !toDate || !danhmucsp.code || !quocgia.code) {
      showMessage("Vui lòng điền đầy đủ thông tin")
    }
    else {
      if (images.length > 0) {
        postImage()
      }
      else{
        postData('')
      }
    }
  }

  const postImage = async () => {
    images.map(async (i) => {
      var form = new FormData()
      form.append('upload', {
        uri: i.uri,
        name: i.uri,
        type: i.type
      })
      var data = await requestPOST_CC(`${dataService.KNCC_URL}/file/photoWithoutAttachment`, form, AccessToken)
      if(data){
        postData(data.url)
      }
    })
  }

  const postData = async (imageUrl) => {
    var obj = {
      TypeInformation: type,
      Title: title,
      Content: content,
      Address: address,
      Phone: phone,
      FromDate: moment(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD') + "T00:00:00.000Z",
      ToDate: moment(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD') + "T00:00:00.000Z",
      CategoryId: danhmucsp.code?danhmucsp.code:null,
      SubCategoryId: loaisp.code?loaisp.code:null,
      ViewCount: 0,
      Images: imageUrl,
      CountryId: quocgia.code?quocgia.code:null,
      ProvinceId: tinh.code?tinh.code:null,
      DistrictId: huyen.code?huyen.code:null,
      CommuneId: xa.code?xa.code:null,
      Status: 0,
      Token: AccessToken,
      Slug: ''
    }
    var data = await requestPOST_CC(`${dataService.KNCC_URL}/SupplyDemand`, obj, AccessToken)
    if(data){
      showMessage({
        message: "Đăng tin thành công",
        type: "success",
      })
    }
    else{
      showMessage({
        message: "Xảy ra lỗi trong quá trình đăng",
        type: "danger",
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title="Đăng tin" isStack={true} />
      {!user ? (
        <BlockLogin name="Đăng tin" loginScreen={'LoginScreen'} registerScreen={'RegisterScreen'} />
      ) : (
          <>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
                  <View style={styles.container}>
                    <View style={{ padding: 10, margin: 10, width: '100%' }}>
                      <View style={{ marginVertical: 5 }}>
                        <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: '600' }}>Loại thông tin</Text>
                        <View style={[styles.textinputContainer, { backgroundColor: 'transparent' }]}>
                          <RadioForm
                            style={{ justifyContent: 'space-between', width: '100%' }}
                            formHorizontal={true}
                            animation={true}
                            radio_props={dataLoai}
                            initial={0}
                            onPress={(value) => { setType(value) }}
                            buttonSize={12}
                            buttonWrapStyle={{ padding: 20 }}
                            buttonColor='#F1462E'
                            selectedButtonColor='#F1462E'
                          />
                        </View>
                      </View>
                      <ItemTextInput
                        value={title}
                        onChangeText={setTitle}
                        title={'Tiêu đề'}
                        icon={'heading'}
                      />
                      <ItemTextInput
                        value={content}
                        onChangeText={setContent}
                        title={'Nội dung'}
                        icon={'file-alt'}
                      />
                      <View style={{ marginVertical: 5 }}>
                        <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: '600' }}>Loại sản phẩm</Text>
                        <View style={[styles.textinputContainer1, { backgroundColor: 'transparent' }]}>
                          <RectButton onPress={chonDanhmucsp} style={[styles.contentChon]}>
                            <Text style={{ color: 'gray', marginEnd: 10, fontWeight: danhmucsp.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                              {danhmucsp.name !== '' ? danhmucsp.name : 'Chọn danh mục sản phẩm'}
                            </Text>
                            <FontAwesome
                              name={danhmucsp.name === '' ? 'chevron-down' : 'times-circle'}
                              color={danhmucsp.name === '' ? 'gray' : '#F26946'}
                            />
                          </RectButton>
                        </View>
                        <View style={[styles.textinputContainer1, { backgroundColor: 'transparent' }]}>
                          <RectButton onPress={chonLoaisp} style={[styles.contentChon]}>
                            <Text style={{ color: 'gray', marginEnd: 10, fontWeight: loaisp.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                              {loaisp.name !== '' ? loaisp.name : 'Chọn loại sản phẩm'}
                            </Text>
                            <FontAwesome
                              name={loaisp.name === '' ? 'chevron-down' : 'times-circle'}
                              color={loaisp.name === '' ? 'gray' : '#F26946'}
                            />
                          </RectButton>
                        </View>
                      </View>
                      <View style={{ marginVertical: 5 }}>
                        <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: '600' }}>Khu vực giao hàng</Text>
                        <View style={[styles.textinputContainer1, { backgroundColor: 'transparent' }]}>
                          <RectButton onPress={chonQuocgia} style={[styles.contentChon]}>
                            <Text style={{ color: 'gray', marginEnd: 10, fontWeight: quocgia.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                              {quocgia.name !== '' ? quocgia.name : 'Chọn quốc gia'}
                            </Text>
                            <FontAwesome
                              name={quocgia.name === '' ? 'chevron-down' : 'times-circle'}
                              color={quocgia.name === '' ? 'gray' : '#F26946'}
                            />
                          </RectButton>
                        </View>
                        <View style={[styles.textinputContainer1, { backgroundColor: 'transparent' }]}>
                          <RectButton onPress={chonTinh} style={[styles.contentChon]}>
                            <Text style={{ color: 'gray', marginEnd: 10, fontWeight: tinh.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                              {tinh.name !== '' ? tinh.name : 'Chọn tỉnh/thành phố'}
                            </Text>
                            <FontAwesome
                              name={tinh.name === '' ? 'chevron-down' : 'times-circle'}
                              color={tinh.name === '' ? 'gray' : '#F26946'}
                            />
                          </RectButton>
                        </View>
                        <View style={[styles.textinputContainer1, { backgroundColor: 'transparent' }]}>
                          <RectButton onPress={chonHuyen} style={[styles.contentChon]}>
                            <Text style={{ color: 'gray', marginEnd: 10, fontWeight: huyen.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                              {huyen.name !== '' ? huyen.name : 'Chọn quận/huyện'}
                            </Text>
                            <FontAwesome
                              name={huyen.name === '' ? 'chevron-down' : 'times-circle'}
                              color={huyen.name === '' ? 'gray' : '#F26946'}
                            />
                          </RectButton>
                        </View>
                        <View style={[styles.textinputContainer1, { backgroundColor: 'transparent' }]}>
                          <RectButton onPress={chonXa} style={[styles.contentChon]}>
                            <Text style={{ color: 'gray', marginEnd: 10, fontWeight: xa.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                              {xa.name !== '' ? xa.name : 'Chọn xã/phường'}
                            </Text>
                            <FontAwesome
                              name={xa.name === '' ? 'chevron-down' : 'times-circle'}
                              color={xa.name === '' ? 'gray' : '#F26946'}
                            />
                          </RectButton>
                        </View>
                      </View>

                      <ItemDateInput
                        value={fromDate}
                        onChangeText={setFromDate}
                        placeholder={'Thời gian bắt đầu'}
                        icon={'calendar-alt'}
                        title={'Thời gian bắt đầu'}
                      />
                      <ItemDateInput
                        value={toDate}
                        onChangeText={setToDate}
                        placeholder={'Thời gian kết thúc'}
                        icon={'calendar-alt'}
                        title={'Thời gian kết thúc'}
                      />
                      <ItemTextInput
                        value={address}
                        onChangeText={setAddress}
                        title={'Địa chỉ liên hệ'}
                        icon={'map-marker-alt'}
                      />
                      <ItemTextInput
                        value={phone}
                        onChangeText={setPhone}
                        title={'Điện thoại'}
                        icon={'phone'}
                      />
                      <View style={{ marginVertical: 5 }}>
                        <Text style={{ marginHorizontal: 10, color: '#5B6062', fontWeight: '600' }}>Hình ảnh</Text>
                        <View style={[styles.textinputContainer, { backgroundColor: 'transparent' }]}>
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
                              <Text style={{ color: '#B0B0B0', fontSize: 12 }}>Thêm ảnh</Text>
                            </TouchableOpacity>
                            {images && images.map((i, index) => <RenderAsset image={i} key={index} images={images} setimages={setimages} />)}
                          </ScrollView>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Button
                    loading={loadingButton}
                    icon={
                      <FontAwesome
                        name="upload"
                        size={15}
                        color="white"
                      />
                    }
                    title="GỬI"
                    containerStyle={{}}
                    buttonStyle={{ borderRadius: 20, backgroundColor: '#f44336', margin: 10, marginHorizontal: 20, marginBottom: 50 }}
                    titleStyle={{ fontSize: 14, paddingLeft: 10 }}
                    onPress={() => checkContetn()}
                  />
                </ScrollView>
              )}</>
        )}

      <ActionSheet
        ref={refRBSheet}
        bounceOnOpen={true}
        bounciness={8}
        gestureEnabled={true}
        containerStyle={{ margin: 20 }}
        defaultOverlayOpacity={0.3}>
        <ScrollView style={{ padding: 15, marginBottom: 20, maxHeight: SCREEN_HEIGHT / 2 }}>
          {typeDialog === 'ThemAnh' ? (
            <>
              <TouchableOpacity
                style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
                onPress={() => {
                  pickMultiple();
                }}>
                <FontAwesome name="images" size={20} color="#EF6C00" />
                <Text style={{ fontWeight: 'bold', marginStart: 15, color: '#5B6062' }}>Chọn từ thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                <FontAwesome name="camera" size={20} color="#EF6C00" />
                <Text style={{ fontWeight: 'bold', marginStart: 15, color: '#5B6062' }}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                <FontAwesome name="video" size={20} color="#EF6C00" />
                <Text style={{ fontWeight: 'bold', marginStart: 15, color: '#5B6062' }}>Quay video</Text>
              </TouchableOpacity>
            </>
          ) : typeDialog === 'Danhmucsp' ? (
            <RenderChonMucDo
              data={dataDanhmuc}
              handleDongY={handleDanhmucsp}
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              title="Chọn danh mục sản phẩm"
            />
          ) : typeDialog === 'Loaisp' ? (
            <RenderChonMucDo
              data={dataLoaisp}
              handleDongY={handleLoaisp}
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              title="Chọn loại sản phẩm"
            />
          ) : typeDialog === 'Quocgia' ? (
            <RenderChonMucDo
              data={dataquocgia}
              handleDongY={handleQuocgia}
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              title="Chọn quốc gia"
            />
          ) : typeDialog === 'Tinh' ? (
            <RenderChonMucDo
              data={dataTinh}
              handleDongY={handleTinh}
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              title="Chọn tỉnh/thành phố"
            />
          ) : typeDialog === 'Huyen' ? (
            <RenderChonMucDo
              data={dataHuyen}
              handleDongY={handleHuyen}
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              title="Chọn quận/huyện"
            />
          ) : typeDialog === 'Xa' ? (
            <RenderChonMucDo
              data={dataXa}
              handleDongY={handleXa}
              actionSheetRef={refRBSheet}
              ModalHide={ModalHide}
              title="Chọn xã/phường"
            />
          ) : (
                          <></>
                        )}
        </ScrollView>
      </ActionSheet>
    </View>
  );
};

export default KNCC_CB_MainScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
  },
  textinputContainer1: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  contentChon: {
    padding: 10,
    margin: 5,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
});
