/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import {Header} from '../../components';

import {TextInputChonViTri, TexInputDate} from '../../components/giaothong';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const [dataNhaXe, setDataNhaXe] = useState([]);
  const [dataDiChung, setDataDiChung] = useState([]);

  const [NgayDi, setNgayDi] = useState('');
  const [DiemDi, setDiemDi] = useState({NameWithType: '', Id: -1, Name: ''});
  const [DiemDen, setDiemDen] = useState({NameWithType: '', Id: -1, Name: ''});

  useEffect(() => {
    return () => {};
  }, []);

  const TimKiem = () => {
    if (DiemDi.NameWithType.length < 1 && DiemDen.NameWithType.length < 1) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng nhập thông tin',
        type: 'danger',
        duration: 5000,
      });
    } else {
      navigation.navigate('GT_DiChung_TimXeKhach_DanhSach_Screen', {NgayDi, DiemDi, DiemDen});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ImageBackground
        imageStyle={{}}
        resizeMode="cover"
        style={{width: '100%', height: 200, position: 'absolute'}}
        source={require('../../Images/bgdixe.jpeg')}
      />
      <Header title="Tìm xe khách" isStack={true} backgroundColor="transparent" textColor={'#FFF'} />

      <ScrollView>
        <View style={{marginTop: 20, marginHorizontal: 20}}>
          <Text style={{color: '#FFF', fontSize: 22, fontWeight: 'bold'}}>{`Chào ${user.fullName}!`}</Text>
          <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Hôm nay bạn muốn đi đâu?</Text>
        </View>
        <View style={styles.content}>
          <TextInputChonViTri value={DiemDi?.NameWithType ?? ''} title={'Nơi đi'} setValue={setDiemDi} isImportant={true} />
          <TextInputChonViTri value={DiemDen?.NameWithType ?? ''} title={'Nơi đến'} setValue={setDiemDen} isImportant={true} />
          <TexInputDate value={NgayDi} setValue={setNgayDi} title={'Ngày khởi hành'} />
          <Button buttonStyle={{marginTop: 20, marginHorizontal: 15}} title="Tìm kiếm" onPress={TimKiem} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    borderColor: '#abb4bd65',
    shadowRadius: 2,
    elevation: 2,
  },
});
