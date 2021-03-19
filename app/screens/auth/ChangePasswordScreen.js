/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';

//import Base64 from '../../utils/Base64';
import {ItemTextInput} from '../../components/common';
import {requestPOST} from '../../services/Api';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const username = user.username;
  const [isLoading, setIsLoading] = useState(false);

  const [newpass, setNewpas] = useState('');
  const [password2, setPassword2] = useState('');
  const [oldpass, setOldpass] = useState('');

  const handleOnpress = async () => {
    Keyboard.dismiss();

    if (username.length > 1 && oldpass.length > 1 && newpass.length > 1 && newpass === password2) {
      setIsLoading(true);
      try {
        var res = await requestPOST(`${dataService.CD_URL}/UpdatePassword`, {
          token: user.token,
          oldpass: oldpass,
          newpass: newpass,
        });

        console.log(`${dataService.CD_URL}/UpdatePassword`);
        console.log({
          token: user.token,
          oldpass: oldpass,
          newpass: newpass,
        });

        setIsLoading(false);
        if (res && res.error.code === 200) {
          showMessage({
            message: 'Thành công',
            description: 'Mật khẩu được đổi thành công!',
            type: 'success',
          });
          //dispatch(actions.logOut());
          dispatch(actions.login(username, newpass)).then(() => {
            //dispatch(actions.GetUserInfo());
          });
          navigation.navigate('HomeScreen');
        } else {
          showMessage({
            message: 'Thất bại',
            description: 'Thông tin gửi chưa thành công! Vui lòng kiểm tra lại!',
            type: 'danger',
          });
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
          text: 'Đổi mật khẩu',
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />

      <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{margin: 10}}>
          <ItemTextInput
            showEye={true}
            value={oldpass}
            onChangeText={setOldpass}
            placeholder={'Mật khẩu cũ'}
            icon={'key'}
            title={'Mật khẩu cũ'}
          />
          <ItemTextInput
            showEye={true}
            value={newpass}
            onChangeText={setNewpas}
            placeholder={'Mật khẩu'}
            icon={'key'}
            title={'Mật khẩu'}
          />

          <ItemTextInput
            showEye={true}
            value={password2}
            onChangeText={setPassword2}
            placeholder={'Nhập lại mật khẩu'}
            icon={'key'}
            title={'Nhập lại mật khẩu'}
          />

          <Button
            onPress={() => handleOnpress()}
            title={'ĐỔI MẬT KHẨU'}
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
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginTop: 20,
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
});
