/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/dvc/Actions';
import {ItemTextInput} from '../../components/common';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.dvc.user);

  if (user) {
    navigation.navigate('DVC_MainScreen');
  }
  //

  const {actionsLoading, error} = useSelector(
    (state) => ({
      actionsLoading: state.dvc.actionsLoading,
      error: state.dvc.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Thất bại',
        description: 'Xác thực thất bại',
        type: 'danger',
      });
    }
    return () => {};
  }, [error]);

  //  const user = useSelector(state => state.global.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!username || !password) {
      showMessage({
        message: 'Thất bại',
        description: 'Chưa nhập đầy đủ trường thông tin!',
        type: 'danger',
      });
      return;
    }

    dispatch(actions.login(username, password)).then(() => {
      //
    });
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

      <View style={styles.container}>
        <Text style={styles.header_1}>{'ĐĂNG NHẬP'}</Text>
        <View style={{margin: 10}}>
          <ItemTextInput
            value={username}
            onChangeText={setUsername}
            placeholder={'Tên đăng nhập'}
            icon={'user'}
            title={'Tên đăng nhập'}
          />

          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Mật khẩu'}
            icon={'key'}
            title={'Mật khẩu'}
          />

          <Button
            onPress={() => handleLogin(username, password)}
            title={'ĐĂNG NHẬP'}
            loading={actionsLoading}
            titleStyle={{fontSize: 14, fontWeight: 'bold'}}
            buttonStyle={styles.btDangNhap}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
          <TouchableOpacity onPress={() => navigation.navigate('DVC_Auth_RegisterScreen')}>
            <Text style={{textAlign: 'center', color: '#2E529F', fontWeight: 'bold'}}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DVC_Auth_ForgotScreen')}>
            <Text style={{textAlign: 'center', color: '#2E529F', fontWeight: 'bold', marginStart: 10}}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* {actionsLoading && <View style={styles.loading} />} */}
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
});
