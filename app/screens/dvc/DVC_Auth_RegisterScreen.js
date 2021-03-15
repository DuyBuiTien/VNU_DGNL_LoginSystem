/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/global/Actions';
import {ItemTextInput} from '../../components/common';

const LoginScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const dataApp = useSelector((state) => state.global.dataApp);

  const {actionsLoading, error} = useSelector(
    (state) => ({
      actionsLoading: state.global.actionsLoading,
      error: state.global.error,
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

  const username_tmp = useSelector((state) => state.global.username_tmp);
  const password_tmp = useSelector((state) => state.global.password_tmp);

  const [username, setUsername] = useState(username_tmp);
  const [password, setPassword] = useState('');
  const [hide, isHide] = useState(false);
  const checkXacThucVanTay = useSelector((state) => state.global.XacThucVanTay);

  const handleLogin = async (username_, password_) => {
    Keyboard.dismiss();
    if (!username_ || !password_) {
      showMessage({
        message: 'Thất bại',
        description: 'Chưa nhập đầy đủ trường thông tin!',
        type: 'danger',
      });
      return;
    }

    dispatch(actions.login(username_, password_)).then(() => {
      dispatch(actions.GetUserInfo());
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

      <ScrollView containerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header_1}>{dataApp?.title ?? 'ĐĂNG KÝ'}</Text>

        <View style={{margin: 10}}>
          <ItemTextInput
            value={username}
            onChangeText={setUsername}
            placeholder={'Tên đăng nhập'}
            icon={'user'}
            title={'Tên đăng nhập'}
            description={'Chỉ gồm các ký tự từ a-z, 0-9 và không gồm các ký tự đặc biệt. Ví dụ: ThanhXuan123'}
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
            value={password}
            onChangeText={setPassword}
            placeholder={'Nhập lại mật khẩu'}
            icon={'key'}
            title={'Nhập lại mật khẩu'}
          />

          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Họ và tên'}
            icon={'user'}
            title={'Họ và tên'}
          />
          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Giấy tờ tuỳ thân'}
            icon={'id-card'}
            title={'Số giấy tờ tuỳ thân (CMND/thẻ CCCD/giấy tờ tuỳ thân khác)'}
          />
          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Số iện thoại'}
            icon={'phone'}
            title={'Số điện thoại'}
          />
          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Thư điện tử'}
            icon={'at'}
            title={'Thư điện tử'}
          />
          <ItemTextInput
            showEye={true}
            value={password}
            onChangeText={setPassword}
            placeholder={'Địa chỉ'}
            icon={'map-marker-alt'}
            title={'Địa chỉ'}
          />

          <Button
            onPress={() => handleLogin(username, password)}
            title={'ĐĂNG KÝ'}
            loading={actionsLoading}
            titleStyle={{fontSize: 14, fontWeight: 'bold'}}
            buttonStyle={styles.btn}
          />
        </View>
      </ScrollView>
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

    shadowOpacity: 0.2,
    borderWidth: 0.4,
    borderColor: '#abb4bd65',
    shadowRadius: 2,
  },
  textinput: {flex: 1, paddingVertical: 10},
  textinputIcon: {marginHorizontal: 10},
});
