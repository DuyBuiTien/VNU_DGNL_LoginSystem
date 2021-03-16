/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/dvc/Actions';
import {ItemTextInput} from '../../components/common';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.dvc.user);
  const username = user.username;
  const password = user.password;

  const [isLoading, setIsLoading] = useState(false);

  const [fullname, setFullname] = useState(user.fullName);
  const [address, setAddress] = useState(user.address);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  const [email, setEmail] = useState(user.email);
  const [cmnd, setCmnd] = useState(user.cmnd);

  if (!user) {
    navigation.navigate('DVC_MainScreen');
  }

  useEffect(() => {
    dispatch(actions.login(username, password));
    return () => {};
  }, []);

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
          <ItemTextInput value={username} placeholder={'Tên tài khoản'} icon={'user'} title={'Tên đăng nhập'} />
          <Button
            onPress={() => navigation.navigate('DVC_Auth_ChangePasswordScreen')}
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
          <ItemTextInput
            value={cmnd}
            onChangeText={setCmnd}
            placeholder={'Giấy tờ tuỳ thân'}
            icon={'id-card'}
            title={'Số giấy tờ tuỳ thân'}
          />
          <ItemTextInput
            showEye={true}
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholder={'Số iện thoại'}
            icon={'phone'}
            title={'Số điện thoại'}
          />
          <ItemTextInput value={email} placeholder={'Thư điện tử'} icon={'at'} title={'Thư điện tử'} />
          <ItemTextInput
            value={address}
            onChangeText={setAddress}
            placeholder={'Địa chỉ'}
            icon={'map-marker-alt'}
            title={'Địa chỉ'}
          />
        </View>
      </ScrollView>
      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          onPress={() => {}}
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
