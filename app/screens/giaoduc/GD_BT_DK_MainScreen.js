import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Platform, Linking, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { List } from 'react-native-paper';
import RadioForm from '../../modules/react-native-simple-radio-button';
import Modal from 'react-native-modal';
import { showMessage } from 'react-native-flash-message';
import DatePicker from '../../modules/react-native-datepicker'
import { RectButton } from 'react-native-gesture-handler';
import { Button } from "react-native-elements";
import ActionSheet from '../../modules/react-native-actions-sheet';

import { GD_INFO } from '../../data/GD_Data'
import { Header } from '../../components';

import { requestGET, requestPOST } from '../../services/Api';

import { RenderChonDonVi, RenderChonMucDo, RenderChonLinhVuc } from '../../components/dvc';

import moment from 'moment';
moment.locale('vi');

const GD_BT_DK_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const dataService = useSelector((state) => state.global.dataService);
  const [data, setData] = useState([]);
  const [dot, setDot] = useState({ code: '', name: '' });
  const [ghiChu, setGhiChu] = useState('');
  const refRBSheet = useRef();

  const fetchData = async () => {
    var NamHocID = await AsyncStorage.getItem('NamHocID')
    var TruongID = await AsyncStorage.getItem("TruongID")
    var body = { 'token': GD_INFO.token, 'truonghocid': TruongID, 'namhocid': NamHocID }
    var data1 = await requestPOST(`${dataService.GD_URL}/PhuHuynh_DotDangKyAnBanTru`, body)
    var data2 = data1.data ? data1.data : []
    var dataLD = []
    data2.map((i, index) => dataLD.push({ name: `${i.TieuDe}(${moment(i.TuNgay).format('DD/MM/YYYY')} - ${moment(i.DenNgay).format('DD/MM/YYYY')})`, code: i.ID }))
    setData(dataLD)
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
  };

  const handleDot = (item) => {
    ModalHide();
    setDot(item);
  };

  const ChonDot = () => {
    refRBSheet.current.setModalVisible(true);
  };

  checkContent = async (_dot, _ghiChu) => {
    if (!_dot) {
      showMessage('Vui lòng nhập đầy đủ thông tin')
    }
    else {
      setIsLoading(true)
      var studentID = await AsyncStorage.getItem('studentID')
      var LopID = await AsyncStorage.getItem('LopID')
      var body = { 'token': GD_INFO.token, 'hocsinhid': studentID, 'lophocid': LopID, 'dotdangkyid': _dot, 'ghichu': _ghiChu }
      var data1 = await requestPOST(`${dataService.GD_URL}/PhuHuynh_DangKyAnBanTru`, body)
      if (data1 && data1.error.code == 200) {
        setTimeout(() => {
          setDot({ code: '', name: '' })
          showMessage('Đăng ký thành công')
          setGhiChu('')
          setIsLoading(false)
        }, 1000);
      }
      else {
        var err = data1.error ? data1.error.userMessage : "Xảy ra lỗi trong quá trình đăng ký"
        showMessage(err)
        setIsLoading(false)
      }
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title="Đăng ký ăn bán trú" isStack={true} />
      <KeyboardAvoidingView style={{ flex: 1, padding: 10 }} behavior="padding" enabled keyboardVerticalOffset={10}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20 }}>
            <Text style={{ color: '#212121', paddingStart: 10 }}>Đợt đăng ký</Text>
            <RectButton onPress={ChonDot} style={[styles.contentChon, { backgroundColor: '#F7F7F7' }]}>
              <Text style={{ color: 'gray', marginEnd: 10, fontWeight: dot.name !== '' ? 'bold' : 'normal' }} numberOfLines={1}>
                {dot.name !== '' ? dot.name : 'Chọn đợt đăng ký'}
              </Text>
              <FontAwesome
                name={dot.name === '' ? 'chevron-down' : 'times-circle'}
                color={dot.name === '' ? 'gray' : '#F26946'}
              />
            </RectButton>
          </View>
          <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20 }}>
            <Text style={{ color: '#212121', paddingStart: 10 }}>Ghi chú</Text>
            <TextInput placeholderTextColor='#BDBDBD' style={{ height: 50 }} value={ghiChu} onChangeText={(text) => setGhiChu(text)} />
          </View>
          <TouchableOpacity
            style={{ width: '100%', backgroundColor: '#F23A27', padding: 10, marginTop: 10, borderRadius: 10 }}
            onPress={() => checkContent(dot.code, ghiChu)}>
            {isLoading ? <ActivityIndicator color="#fff" style={{ textAlign: 'center' }} /> : <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFF' }}>Gửi</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
        containerStyle={{ margin: 20 }}
        defaultOverlayOpacity={0.3}>
        <RenderChonMucDo
          data={data}
          handleDongY={handleDot}
          actionSheetRef={refRBSheet}
          ModalHide={ModalHide}
          title="Chọn đợt đăng ký"
        />
      </ActionSheet>
    </View>
  );
};

export default GD_BT_DK_MainScreen;

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  view1: {
    flexDirection: 'row', alignItems: 'center', padding: 20
  },
  text1: {
    fontSize: 16, color: '#323232', paddingStart: 20
  },
  text2: {
    fontSize: 16, color: '#fff', paddingStart: 20, fontWeight: 'bold'
  },
  text3: {
    fontSize: 16, color: '#fff', fontWeight: 'bold'
  },
  date: {
    fontSize: 10,
  },
  content: {
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: 100,
    padding: 20
  },
  contentChon: {
    padding: 10,
    margin: 5,
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
