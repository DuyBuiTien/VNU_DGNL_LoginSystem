/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import {Header} from '../../components';

import {ItemTextInput} from '../../components/common';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [luongdouong, setLuongdouong] = useState('');
  const [tyle, setTyle] = useState(0);
  const [thoigian, setThoigian] = useState('');
  const [cannang, setCannang] = useState('');
  const [ketqua, setKetqua] = useState('');

  const round = (n, dec) => {
    let X = n * Math.pow(10, dec);
    X = Math.round(X);
    return (X / Math.pow(10, dec)).toFixed(dec);
  };

  const XemKetQua = () => {
    setKetqua('');
    console.log(luongdouong.length);
    //if (parseInt(luongdouong, 10) <= 0 || parseInt(tyle, 10) <= 0 || parseInt(thoigian, 10) <= 0 || parseInt(cannang, 10) <= 0) {
    if (luongdouong.length < 1 || tyle.length < 1 || thoigian.length < 1 || cannang.length < 1) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng nhập đầy đủ thông tin!',
        type: 'danger',
        duration: 5000,
      });
      return;
    }

    let r = 0.68;
    var beta = 0.01;
    var n = 5.14;
    var g = 1.055;
    let unit_A = 0.001 * 1000;
    let unit_W = 1;
    let pct = parseInt(tyle, 10) / 100;
    let W = parseInt(cannang, 10);
    let unit_h = 60;

    let unit_bac = 105.5;
    var bac = round(
      ((parseInt(luongdouong, 10) * unit_A * 0.035195 * pct * n * g) / (((W * unit_W) / 0.453592) * r) -
        (parseInt(thoigian, 10) / unit_h) * beta) *
        10 *
        unit_bac,
      4,
    );
    setKetqua(`${bac} (mg/100ml)`);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Tính nồng độ cồn" isStack={true} />
      <ScrollView>
        <ItemTextInput
          value={cannang}
          onChangeText={setCannang}
          placeholder={'Cân nặng'}
          icon={'weight-hanging'}
          title={'Cân nặng (kg):'}
        />
        <ItemTextInput
          value={luongdouong}
          onChangeText={setLuongdouong}
          placeholder={'Lượng đồ uống'}
          icon={'wine-bottle'}
          title={'Thể tích đã uống (ml):'}
        />
        <ItemTextInput
          value={tyle}
          onChangeText={setTyle}
          placeholder={'Tỷ lệ'}
          icon={'percent'}
          title={'Tỷ lệ cồn theo thể tích (alc/vol %):'}
        />
        <ItemTextInput
          value={thoigian}
          onChangeText={setThoigian}
          placeholder={'Thời gian'}
          icon={'clock'}
          title={'Thời gian uống (phút):'}
        />
        <Button
          onPress={XemKetQua}
          title={'Xem kết quả'}
          titleStyle={{fontSize: 14, fontWeight: 'bold', color: '#FFF'}}
          buttonStyle={[
            styles.btDangNhap,
            {backgroundColor: '#EF6C00', borderWidth: 0.5, borderColor: 'gray', marginHorizontal: 50},
          ]}
        />
        <Text style={{textAlign: 'center', marginTop: 20, color: '#37474f', fontWeight: 'bold', fontSize: 15}}>{ketqua}</Text>
        {ketqua.length > 0 && (
          <Text style={{textAlign: 'center', marginTop: 20, color: '#37474f', fontSize: 13, fontStyle: 'italic'}}>
            (Giá trị chỉ mang tính chất tham khảo)
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
