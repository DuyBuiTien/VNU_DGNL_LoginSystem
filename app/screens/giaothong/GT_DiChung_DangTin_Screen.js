/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Header} from '../../components';
import ActionSheet from '../../modules/react-native-actions-sheet';
import * as actions from '../../redux/global/Actions';

import axios from 'axios';
import {RenderChonViTri, TextInputLuaChon, GTTextInput, TexInputDate} from '../../components/giaothong';

const DATAVAITRO = [
  {Id: 0, Name: 'Hành khách'},
  {Id: 1, Name: 'Chủ xe'},
];

const DATAGIOITINH = [
  {Id: 0, Name: 'Nam'},
  {Id: 1, Name: 'Nữ'},
  {Id: 2, Name: 'Khác'},
];

const PHUONGTIEN = [
  {Id: 0, Name: 'Ô tô 4 chỗ'},
  {Id: 1, Name: 'Ô tô 7 chỗ'},
  {Id: 2, Name: 'Ô tô 16 chỗ'},
  {Id: 3, Name: 'Ô tô 24 chỗ'},
  {Id: 4, Name: 'Ô tô 45 chỗ'},
  {Id: 5, Name: 'Xe máy'},
  {Id: 6, Name: 'Khác'},
];

const MUCDICH = [
  {Id: 0, Name: 'Đi học'},
  {Id: 1, Name: 'Đi làm'},
  {Id: 2, Name: 'Về quê'},
  {Id: 3, Name: 'Du lịch'},
  {Id: 4, Name: 'Đến sự kiện'},
  {Id: 5, Name: 'Đi sân bay'},
  {Id: 6, Name: 'Chở hàng'},
  {Id: 7, Name: 'Khác'},
];

const DATATANSUAT = [
  {Id: 0, Name: 'Một lần'},
  {Id: 1, Name: 'Hàng ngày'},
  {Id: 2, Name: 'Hàng tuần'},
  {Id: 3, Name: 'Luôn có'},
];

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.user);
  const refRBSheet = useRef();
  const dataService = useSelector((state) => state.global.dataService);

  const [loading, setloading] = useState(false);

  const [isNoidi, setIsNoidi] = useState(true);

  const [Ten, setTen] = useState(user.fullName);
  const [SoDienThoai, setSoDienThoai] = useState(user.phoneNumber);
  const [DiemDi, setDiemDi] = useState('');
  const [DiemDen, setDiemDen] = useState('');
  const [MucDich, setMucDich] = useState('');
  const [HanhLy, setHanhLy] = useState('');
  const [MuonDiCung, setMuonDiCung] = useState('');
  const [GhiChu, setGhiChu] = useState('');
  const [LoaiPhuongTien, setLoaiPhuongTien] = useState('');
  const [VaiTro, setVaiTro] = useState('');
  const [TanSuat, setTanSuat] = useState('');
  const [NgayDi, setNgayDi] = useState('');
  const [NgayVe, setNgayVe] = useState('');
  const [GioDi, setGioDi] = useState('');
  const [GioVe, setGioVe] = useState('');
  const [Thu, setThu] = useState('');
  const [GiaDuKien, setGiaDuKien] = useState(0);
  const [SoGheTrong, setSoGheTrong] = useState(0);
  const [TongSoGhe, setTongSoGhe] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  const ChonDiaDiem = (check) => {
    setIsNoidi(check);
    refRBSheet.current.setModalVisible(true);
  };
  const handleChonNoiDi = (data) => {
    refRBSheet.current.setModalVisible(false);
    setDiemDi(data.PathWithType ? data.PathWithType : data.NameWithType);
  };

  const handleChonNoiDen = (data) => {
    refRBSheet.current.setModalVisible(false);
    setDiemDen(data.PathWithType ? data.PathWithType : data.NameWithType);
  };

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
  };

  const DangTin = async () => {
    setloading(true);

    if (
      Ten.length < 1 ||
      SoDienThoai.length < 1 ||
      DiemDi.length < 1 ||
      DiemDen.length < 1 ||
      LoaiPhuongTien.length < 1 ||
      VaiTro.length < 1 ||
      MucDich.length < 1 ||
      TanSuat.length < 1 ||
      NgayDi.length < 1
    ) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng nhập đầy đủ thông tin cần đăng',
        type: 'danger',
        duration: 5000,
      });
      setloading(false);
      return;
    }

    var config = {
      method: 'post',
      url: `${dataService.BOOKMARK_URL}/v1/dichungxe`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        Ten,
        SoDienThoai,
        DiemDi,
        DiemDen,
        HanhLy,
        MuonDiCung,
        GhiChu,
        LoaiPhuongTien,
        VaiTro,
        TanSuat,
        NgayDi,
        NgayVe,
        GioDi,
        GioVe,
        Thu,
        GiaDuKien,
        SoGheTrong,
        TongSoGhe,
      },
    };

    const res = await axios(config);

    setloading(false);
    if (res) {
      showMessage({
        message: 'Thành công',
        description: 'Đăng tin thành công!',
        type: 'success',
      });
      dispatch(actions.setRandom());
      navigation.navigate('GT_DiChung_CaNhan_Screen');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Đăng tin" isStack={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <GTTextInput value={Ten} setValue={setTen} title={'Họ tên'} isImportant={true} />
          <GTTextInput value={SoDienThoai} setValue={setSoDienThoai} title={'Số điện thoại'} isImportant={true} />

          <TextInputLuaChon value={VaiTro} title={'Vai Trò'} data={DATAVAITRO} setValue={setVaiTro} isImportant={true} />
          <TextInputLuaChon value={MucDich} title={'Mục đích'} data={MUCDICH} setValue={setMucDich} isImportant={true} />
          <GTTextInput value={GhiChu} setValue={setGhiChu} title={'Ghi chú'} multiline={true} />
          <TextInputLuaChon
            value={LoaiPhuongTien}
            title={'Loại phương tiện'}
            data={PHUONGTIEN}
            setValue={setLoaiPhuongTien}
            isImportant={true}
          />
          <GTTextInput value={TongSoGhe} setValue={setTongSoGhe} title={'Số ghế đặt'} />
          <GTTextInput value={GiaDuKien} setValue={setGiaDuKien} title={'Giá'} />
          <GTTextInput value={HanhLy} setValue={setHanhLy} title={'Hành lý'} />

          <TextInputLuaChon value={MuonDiCung} title={'Muốn đi cùng'} data={DATAGIOITINH} setValue={setMuonDiCung} />

          <View style={styles.content1}>
            <Text style={styles.title}>
              Nơi đi: <Text style={{color: 'red', fontWeight: 'bold'}}>{' *'}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                ChonDiaDiem(true);
              }}
              style={styles.contenttext}>
              <Text
                style={{color: DiemDi !== '' ? '#3B3B3B' : 'gray', fontWeight: DiemDi !== '' ? 'bold' : 'normal'}}
                numberOfLines={1}>
                {DiemDi !== '' ? DiemDi : 'Chọn nơi đi'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'gray'} />
            </TouchableOpacity>
          </View>
          <View style={styles.content1}>
            <Text style={styles.title}>
              Nơi đến:<Text style={{color: 'red', fontWeight: 'bold'}}>{' *'}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                ChonDiaDiem(false);
              }}
              style={styles.contenttext}>
              <Text
                style={{color: DiemDen !== '' ? '#3B3B3B' : 'gray', fontWeight: DiemDen !== '' ? 'bold' : 'normal'}}
                numberOfLines={1}>
                {DiemDen !== '' ? DiemDen : 'Chọn nơi đến'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'gray'} />
            </TouchableOpacity>
          </View>

          <TextInputLuaChon value={TanSuat} title={'Tần suất'} data={DATATANSUAT} setValue={setTanSuat} isImportant={true} />

          <TexInputDate value={NgayDi} setValue={setNgayDi} title={'Ngày đi'} isImportant={true} />
          <TexInputDate value={NgayVe} setValue={setNgayVe} title={'Ngày về'} />

          <Button buttonStyle={{marginTop: 20, marginHorizontal: 15, marginBottom: 10}} title="Đăng tin" onPress={DangTin} />
        </View>
      </ScrollView>
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
        <RenderChonViTri
          handleDongY={isNoidi ? handleChonNoiDi : handleChonNoiDen}
          actionSheetRef={refRBSheet}
          title="Chọn hành trình"
          ModalHide={ModalHide}
        />
      </ActionSheet>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  content1: {paddingHorizontal: 15, paddingTop: 20},
  title: {color: '#5B6062', fontWeight: 'bold'},
  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  contenttext: {
    marginTop: 10,
    padding: 10,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    padding: 5,
    borderColor: '#D1D1D1',
    borderWidth: 0.5,
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
