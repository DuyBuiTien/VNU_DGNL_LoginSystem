/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/global/Actions';
import {ItemTextInput, ItemCheckbox, ItemDateInput} from '../../components/common';
import {requestPOST} from '../../services/Api';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataService = useSelector((state) => state.global.dataService);

  const user = useSelector((state) => state.global.user);
  console.log(user);
  const username = user.username;
  const password = user.password;
  const token = user.token;

  const [isLoading, setIsLoading] = useState(false);

  const [fullname, setFullname] = useState(user.fullName);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhonenumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [cmnd, setCmnd] = useState(user.personalid);
  const [birthday, setBirthday] = useState(user.birthday);
  const [sex, setSex] = useState(user.sex);
  const [areaCode, setAreaCode] = useState(user.maXa);
  const [personalid, setPersonalid] = useState(user.personalid);
  const [personaliddate, setPersonaliddate] = useState(user.personaliddate);
  const [personalidaddress, setPersonalidaddress] = useState(user.personalidaddress);
  const [iscompany, setIscompany] = useState(user.iscompany);
  const [companyname, setCompanyname] = useState(user.companyname);
  const [companyaddress, setCompanyaddress] = useState(user.companyaddress);
  const [companycode, setCompanycode] = useState(user.companycode);

  if (!user) {
    navigation.navigate('LoginScreen');
  }

  useEffect(() => {
    dispatch(actions.login(username, password));
    return () => {};
  }, []);

  const handleOnpress = async () => {
    Keyboard.dismiss();

    if (username.length > 1 && fullname.length > 1) {
      setIsLoading(true);
      try {
        var res = await requestPOST(`${dataService.CD_URL}/UpdateUser`, {
          token: token,
          address: address,
          birthday: birthday,
          email: email,
          fullName: fullname,
          phone: phone,
          sex: sex,
          personalid: personalid,
          personaliddate: personalid,
          personalidaddress: personalidaddress,
          iscompany: iscompany,
          companyname: companyname,
          companyaddress: companyaddress,
          companycode: companycode,
        });
        setIsLoading(false);
        if (res && res.error.code === 200) {
          showMessage({
            message: 'Thành công',
            description: 'Thông tin thay đổi thành công!',
            type: 'success',
          });
          dispatch(actions.login(username, password)).then(() => {
            //dispatch(actions.GetUserInfo());
          });
        }
      } catch (error) {
        showMessage({
          message: 'Thất bại',
          description: 'Vui lòng kiểm tra lại!',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Thất bại',
        description: 'Vui lòng kiểm tra lại!',
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
          text: 'Thông tin cá nhân',
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={{marginHorizontal: 15, marginTop: 20}}>
          <ItemTextInput
            value={username}
            placeholder={'Số điện thoại đăng nhập'}
            icon={'user'}
            title={'Số điện thoại đăng nhập'}
          />
          <Button
            onPress={() => navigation.navigate('ChangePasswordScreen')}
            title={'Thay đổi mật khẩu'}
            titleStyle={{fontSize: 14, fontWeight: 'bold', color: '#EF6C00'}}
            buttonStyle={[styles.btDangNhap, {backgroundColor: '#FFF', borderWidth: 0.5, borderColor: 'gray'}]}
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
          <ItemTextInput value={sex} onChangeText={setSex} placeholder={'Giới tính'} icon={'venus-mars'} title={'Giới tính'} />
          <ItemTextInput
            value={phone}
            onChangeText={setPhonenumber}
            placeholder={'Số điện thoại'}
            icon={'phone'}
            title={'Số điện thoại'}
          />
          <ItemTextInput value={email} placeholder={'Thư điện tử'} icon={'at'} title={'Thư điện tử'} />

          <ItemTextInput
            value={cmnd}
            onChangeText={setCmnd}
            placeholder={'Giấy tờ tuỳ thân'}
            icon={'id-card'}
            title={'Số giấy tờ tuỳ thân'}
          />
          <ItemTextInput
            value={personalid}
            onChangeText={setPersonalid}
            placeholder={'Số giấy tờ tuỳ thân'}
            icon={'id-card'}
            title={'Số giấy tờ tuỳ thân'}
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
            placeholder={'Nơi cấp'}
            icon={'map-marker-alt'}
            title={'Nơi cấp'}
          />

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

          <View style={{height: 30}}></View>
        </View>
      </ScrollView>
      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          onPress={() => {
            handleOnpress();
          }}
          loading={isLoading}
          title={'Cập nhật thông tin cá nhân'}
          titleStyle={{fontSize: 14, fontWeight: 'bold'}}
          containerStyle={{marginVertical: 10, marginHorizontal: 20}}
          buttonStyle={styles.btDangNhap}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  containerLoginForm: {
    //backgroundColor: '#E7E7E7',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  containerXacThuc: {
    flexDirection: 'row',
    paddingTop: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLuaChon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  header_1: {
    color: '#2E529F',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  header_2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {color: '#fff', paddingStart: 10},
  btDangNhap: {
    borderRadius: 4,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: '#EF6C00',
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
  content1: {marginHorizontal: 15, marginTop: 20},
  title: {color: '#5B6062', fontWeight: '600'},
});
