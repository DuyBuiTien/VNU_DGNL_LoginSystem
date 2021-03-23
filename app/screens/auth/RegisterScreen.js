/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

//import Base64 from '../../utils/Base64';
import {ItemTextInput, ItemCheckbox, ItemDateInput} from '../../components/common';
import {requestPOST} from '../../services/Api';

const LoginScreen = () => {
  const navigation = useNavigation();

  const dataService = useSelector((state) => state.global.dataService);

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gioitinh, setGioitinh] = useState('');

  const [areaCode, setAreaCode] = useState('');
  const [personalid, setPersonalid] = useState('');
  const [personaliddate, setPersonaliddate] = useState('');
  const [personalidaddress, setPersonalidaddress] = useState('');
  const [iscompany, setIscompany] = useState(false);
  const [companyname, setCompanyname] = useState('');
  const [companyaddress, setCompanyaddress] = useState('');
  const [companycode, setCompanycode] = useState('');

  const setUserNameTmp = (number) => {
    setUsername(number.replace(/[^0-9]/g, ''));
  };

  const handleOnpress = async () => {
    Keyboard.dismiss();

    if (
      username.length > 1 &&
      email.length > 1 &&
      fullname.length > 1 &&
      email.length > 1 &&
      phonenumber.length > 1 &&
      password === password2
    ) {
      setIsLoading(true);
      try {
        var res = await requestPOST(`${dataService.CD_URL}/RegisterAccount`, {
          account: username,
          passWord: password,
          address: address,
          avatar: '',
          birthday: birthday,
          email: email,
          fullName: fullname,
          phone: phonenumber,
          sex: gioitinh,
          personalid: personalid,
          personaliddate: personaliddate,
          personalidaddress: personalidaddress,
          iscompany: true,
          companyname: companyname,
          companyaddress: companyaddress,
          companycode: companycode,
        });
        console.log(res);
        setIsLoading(false);
        if (res && res.error.code === 200) {
          showMessage({
            message: 'Thành công',
            description: 'Thông tin về tài khoản được gửi về địa chỉ thư điện tử của bạn!',
            type: 'success',
          });
          navigation.navigate('DVC_Auth_LoginScreen');
        }
      } catch (error) {
        showMessage({
          message: 'Thất bại',
          description: 'Thông tin gửi chưa thành công! Vui lòng kiểm tra lại!',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Thất bại',
        description: 'Thông tin gửi chưa thành công! Vui lòng kiểm tra lại!',
        type: 'danger',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {/* <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} /> */}
      <Header
        statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="dark-content"
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'long-arrow-left'}
              size={25}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: '',
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />

      <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header_1}>{'ĐĂNG KÝ'}</Text>

        <View style={{margin: 10}}>
          <ItemTextInput
            value={username}
            onChangeText={setUserNameTmp}
            placeholder={'Số điện thoại đăng nhập'}
            icon={'user'}
            title={'Số điện thoại đăng nhập'}
            keyboardType={'numeric'}
            //description={'Chỉ gồm các ký tự từ a-z, 0-9 và không gồm các ký tự đặc biệt. Ví dụ: ThanhXuan123'}
          />

          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Mật khẩu'}
            icon={'key'}
            title={'Mật khẩu'}
            description={'Từ 6-18 ký tự, có thể có các ký tự đặc biệt. Ví dụ: Password!@#'}
          />

          <ItemTextInput
            showEye={true}
            value={password2}
            onChangeText={setPassword2}
            placeholder={'Nhập lại mật khẩu'}
            icon={'key'}
            title={'Nhập lại mật khẩu'}
          />

          <ItemTextInput
            value={fullname}
            onChangeText={setFullname}
            placeholder={'Họ và tên'}
            icon={'user'}
            title={'Họ và tên'}
          />
          <ItemDateInput
            value={birthday}
            onChangeText={setBirthday}
            placeholder={'Ngày sinh'}
            icon={'calendar-alt'}
            title={'Ngày sinh'}
          />

          <ItemTextInput
            value={gioitinh}
            onChangeText={setGioitinh}
            placeholder={'Giới tính'}
            icon={'venus-mars'}
            title={'Giới tính'}
          />
          <ItemTextInput
            value={personalid}
            onChangeText={setPersonalid}
            placeholder={'Giấy tờ tuỳ thân'}
            icon={'id-card'}
            title={'Số giấy tờ tuỳ thân (CMND/thẻ CCCD/giấy tờ tuỳ thân khác)'}
          />
          <ItemDateInput
            value={personaliddate}
            onChangeText={setPersonaliddate}
            placeholder={'Ngày cấp'}
            icon={'calendar-alt'}
            title={'Ngày cấp'}
          />

          <ItemTextInput
            value={personalidaddress}
            onChangeText={setPersonalidaddress}
            placeholder={'Quê quán'}
            icon={'map-marker-alt'}
            title={'Quê quán'}
          />
          <ItemTextInput
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholder={'Số điện thoại'}
            icon={'phone'}
            keyboardType="numeric"
            title={'Số điện thoại'}
          />
          <ItemTextInput value={email} onChangeText={setEmail} placeholder={'Thư điện tử'} icon={'at'} title={'Thư điện tử'} />
          <ItemTextInput
            value={address}
            onChangeText={setAddress}
            placeholder={'Địa chỉ'}
            icon={'map-marker-alt'}
            title={'Địa chỉ'}
          />

          <ItemCheckbox isChecked={iscompany} setChecked={setIscompany} title={'Tôi là đại diện cho Doanh nghiệp/Nhà đầu tư'} />

          {iscompany && (
            <>
              <ItemTextInput
                value={companyname}
                onChangeText={setCompanyname}
                placeholder={'Tên doanh nghiệp'}
                icon={'file-signature'}
                title={'Tên doanh nghiệp'}
              />
              <ItemTextInput
                value={companyaddress}
                onChangeText={setCompanyaddress}
                placeholder={'Địa chỉ'}
                icon={'map-marker-alt'}
                title={'Địa chỉ'}
              />
              <ItemTextInput
                value={companycode}
                onChangeText={setCompanycode}
                placeholder={'Mã số thuế'}
                icon={'file-alt'}
                title={'Mã số thuế'}
              />
            </>
          )}

          <Button
            onPress={() => handleOnpress()}
            title={'ĐĂNG KÝ'}
            loading={isLoading}
            titleStyle={{fontSize: 14, fontWeight: 'bold'}}
            buttonStyle={styles.btn}
          />
        </View>
      </ScrollView>
      {isLoading && <View style={styles.loading} />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  containerLoginForm: {
    //backgroundColor: '#E7E7E7',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },

  header_1: {
    color: '#2E529F',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  btn: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginTop: 20,
  },
  textLuaChon: {color: 'white', fontWeight: 'bold'},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
  textinput: {flex: 1, paddingVertical: 10},
  textinputIcon: {marginHorizontal: 10},
});
