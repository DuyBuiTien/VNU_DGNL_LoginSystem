/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-elements';
import axios from 'axios';

import {Header} from '../../components';
import {BlockLogin} from '../../components/common';
import {RenderItemDiChung} from '../../components/giaothong';
import {SearchComponent} from '../../components/common';
import {FilterBar} from '../../components/giaothong';

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

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const random = useSelector((state) => state.global.random);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(-1);

  const dataService = useSelector((state) => state.global.dataService);

  const [dataDiChung, setDataDiChung] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response = await axios({
        method: 'get',
        url: `${dataService.BOOKMARK_URL}/v1/dichungxe/tinmoi?page=0&perpage=1000&TrangThai=1&q=${inputValue}&LoaiPhuongTien=${LoaiPhuongTien}&TanSuat=${TanSuat}&VaiTro=${VaiTro}&MucDich=${MucDich}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.data && response.data.data) {
        setDataDiChung(response.data.data);
      } else {
      }
      setRefreshing(false);
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [refreshing, active, inputValue, random, dataService.BOOKMARK_URL, user.token, LoaiPhuongTien, TanSuat, VaiTro, MucDich]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Danh sách tin đăng" isStack={true} />

      {!user ? (
        <BlockLogin name="Đi chung xe" />
      ) : (
        <View style={{flex: 1}}>
          <SearchComponent value={inputValue} onChangeText={setInputValue} />
          <View>
            <ScrollView
              horizontal
              style={{marginBottom: 10, flexDirection: 'row'}}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 10}}>
              <FilterBar value={VaiTro} title={'Vai Trò'} data={DATAVAITRO} setValue={setVaiTro} isImportant={true} />
              <FilterBar value={MucDich} title={'Mục đích'} data={MUCDICH} setValue={setMucDich} isImportant={true} />
              <FilterBar
                value={LoaiPhuongTien}
                title={'Loại phương tiện'}
                data={PHUONGTIEN}
                setValue={setLoaiPhuongTien}
                isImportant={true}
              />
              <FilterBar value={TanSuat} title={'Tần suất'} data={DATATANSUAT} setValue={setTanSuat} isImportant={true} />
            </ScrollView>
          </View>

          <View style={{flex: 1}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={() => {
                  setRefreshing(true);
                }}
                refreshing={refreshing}
                contentContainerStyle={{flexGrow: 1}}
                data={dataDiChung}
                renderItem={(item_) => <RenderItemDiChung data={item_.item} navigation={navigation} />}
                keyExtractor={(item_) => item_.Id}
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                )}
              />
            )}
          </View>
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: '#BDBDBD',
              backgroundColor: '#fff',
            }}>
            <Button
              title="Đăng tin"
              titleStyle={{fontSize: 16, color: '#fff', fontWeight: '600'}}
              containerStyle={{marginVertical: 10, marginHorizontal: 50}}
              buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
              onPress={() => {
                navigation.navigate('GT_DiChung_DangTin_Screen');
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});
